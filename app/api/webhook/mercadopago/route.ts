import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from 'mercadopago';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Inicializa o Mercado Pago com o token da variável de ambiente
// Certifique-se que MP_ACCESS_TOKEN está configurada na Vercel
const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const mercadopagoPayment = new MercadoPagoPayment(mpClient);

// Chave secreta para validar webhooks do Mercado Pago (das variáveis de ambiente)
const MERCADOPAGO_WEBHOOK_SECRET = process.env.MERCADOPAGO_WEBHOOK_SECRET;

export async function POST(request: Request) {
  console.log("--- INÍCIO DA REQUISIÇÃO WEBHOOK MERCADO PAGO ---");

  if (!MERCADOPAGO_WEBHOOK_SECRET) {
    console.error("Erro crítico: MERCADOPAGO_WEBHOOK_SECRET não está configurada.");
    return NextResponse.json({ error: 'Configuração do servidor incompleta.' }, { status: 500 });
  }

  try {
    const requestBodyText = await request.text(); // Ler como texto para validação da assinatura
    const body = JSON.parse(requestBodyText); // Parsear para JSON após leitura como texto

    console.log("Corpo da requisição (payload) do webhook recebido:", JSON.stringify(body, null, 2));

    // Validação da Assinatura do Webhook
    const signatureHeader = request.headers.get('x-signature');
    const requestId = request.headers.get('x-request-id'); // Opcional, mas bom para logs

    if (!signatureHeader) {
      console.warn("Alerta de segurança: Requisição de webhook sem header x-signature.");
      return NextResponse.json({ error: 'Assinatura ausente.' }, { status: 400 });
    }

    console.log(`Headers recebidos: x-signature: ${signatureHeader}, x-request-id: ${requestId}`);

    const parts = signatureHeader.split(',');
    const ts = parts.find(part => part.startsWith('ts='))?.split('=')[1];
    const v1 = parts.find(part => part.startsWith('v1='))?.split('=')[1];

    if (!ts || !v1) {
      console.warn("Alerta de segurança: Formato inválido do header x-signature.");
      return NextResponse.json({ error: 'Formato de assinatura inválido.' }, { status: 400 });
    }

    // A documentação do MP sugere que o template é `id:${notification_id};request-id:${x_request_id};ts:${timestamp};`
    // E o HMAC é gerado sobre `template_content + request_body`
    // Vamos usar o ID da notificação (body.id) e o request-id se disponível
    let templateToSign = `id:${body.id};ts:${ts};`;
    if (requestId) {
        templateToSign = `id:${body.id};request-id:${requestId};ts:${ts};`;
    }

    const calculatedSignature = crypto.createHmac('sha256', MERCADOPAGO_WEBHOOK_SECRET)
                                    .update(templateToSign + requestBodyText)
                                    .digest('hex');

    if (calculatedSignature !== v1) {
      console.warn("Alerta de segurança: Assinatura do webhook inválida.");
      console.log("  Template usado para assinatura:", templateToSign);
      console.log("  Assinatura calculada:", calculatedSignature);
      console.log("  Assinatura recebida (v1):", v1);
      return NextResponse.json({ error: 'Assinatura inválida.' }, { status: 400 });
    }

    console.log("Assinatura do webhook validada com sucesso!");

    // Processar o tipo de evento
    if (body.type === 'payment') {
      const paymentId = body.data.id;
      console.log(`Evento de pagamento recebido para o ID: ${paymentId}. Buscando detalhes...`);

      try {
        const paymentDetails = await mercadopagoPayment.get({ id: paymentId });
        console.log("Detalhes do pagamento obtidos do Mercado Pago:", JSON.stringify(paymentDetails, null, 2));

        if (paymentDetails && paymentDetails.preference_id) {
          const preferenceId = paymentDetails.preference_id;
          const paymentStatus = paymentDetails.status;
          const mercadopagoInternalPaymentId = paymentDetails.id?.toString(); // ID do pagamento no MP

          console.log(`Atualizando pagamento no DB: Preference ID ${preferenceId}, Novo Status: ${paymentStatus}, MP Payment ID: ${mercadopagoInternalPaymentId}`);

          const updatedPayment = await prisma.payment.updateMany({
            where: { mercadopagoPreferenceId: preferenceId },
            data: {
              status: paymentStatus,
              mercadopagoPaymentId: mercadopagoInternalPaymentId,
            },
          });

          if (updatedPayment.count > 0) {
            console.log(`Pagamento com Preference ID ${preferenceId} atualizado com sucesso no banco de dados. Registros afetados: ${updatedPayment.count}`);
          } else {
            console.warn(`Nenhum pagamento encontrado no DB com Preference ID ${preferenceId} para atualização.`);
          }
        } else {
          console.warn("Detalhes do pagamento ou preference_id não encontrados na resposta do Mercado Pago.");
        }
      } catch (mpError) {
        console.error("Erro ao buscar detalhes do pagamento no Mercado Pago:", mpError);
        // Não retornar erro 500 aqui para o MP, pois a notificação foi recebida e validada.
        // O erro é no processamento interno ou comunicação com MP API.
      }
    } else {
      console.log(`Tipo de evento não processado: ${body.type}`);
    }

    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Processada) ---");
    return NextResponse.json({ received: true, message: "Webhook processado com sucesso." }, { status: 200 });

  } catch (error) {
    console.error("Erro geral ao processar webhook do Mercado Pago:", error);
    let errorMessage = "Erro desconhecido ao processar webhook.";
    let errorDetails = "";

    if (error instanceof Error) {
        errorDetails = error.message;
        if (error instanceof SyntaxError && error.message.includes("JSON")) {
            errorMessage = "Erro: Corpo da requisição não é um JSON válido.";
        }
    }
    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Erro Geral) ---");
    return NextResponse.json({ received: false, error: errorMessage, details: errorDetails }, { status: 500 }); // Usar 500 para erro inesperado
  }
}
