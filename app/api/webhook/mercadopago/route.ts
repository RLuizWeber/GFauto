import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from "mercadopago";
import crypto from "crypto";
import { Resend } from "resend"; // Importar Resend

const prisma = new PrismaClient();

// Configuração do Mercado Pago
const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const mercadopagoPayment = new MercadoPagoPayment(mpClient);

// Configuração do Resend
const resend = new Resend(process.env.RESEND_API_KEY); // Chave da API do Resend via variável de ambiente

// Log inicial para verificar as variáveis de ambiente no momento do carregamento do módulo
console.log("DEBUG MODULE LOAD: Raw process.env.MERCADOPAGO_WEBHOOK_SECRET:", process.env.MERCADOPAGO_WEBHOOK_SECRET);
console.log("DEBUG MODULE LOAD: Raw process.env.RESEND_API_KEY:", process.env.RESEND_API_KEY ? "Configurada" : "NÃO CONFIGURADA");

// --- Função de validação da assinatura (mantida como antes) ---
function validateWebhookSignatureRecommended(
  signatureHeader: string | null,
  requestIdHeader: string | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBody: any, 
  webhookSecret: string
): boolean {
  if (!webhookSecret) {
    console.error("validateWebhookSignatureRecommended: MERCADOPAGO_WEBHOOK_SECRET não está configurado.");
    return false;
  }
  if (!signatureHeader) {
    console.error("validateWebhookSignatureRecommended: Cabeçalho x-signature ausente.");
    return false;
  }
  try {
    const parts = signatureHeader.split(",");
    const tsPart = parts.find(part => part.startsWith("ts="));
    const v1Part = parts.find(part => part.startsWith("v1="));
    if (!tsPart || !v1Part) {
      console.error("validateWebhookSignatureRecommended: Formato inválido do cabeçalho x-signature. Recebido:", signatureHeader);
      return false;
    }
    const timestamp = tsPart.split("=")[1];
    const receivedSignature = v1Part.split("=")[1];
    let resourceId: string | undefined;
    if (requestBody && typeof requestBody === "object") {
        resourceId = requestBody.data?.id || requestBody.id;
        if (!resourceId && requestBody.resource && typeof requestBody.resource === "string") {
            const resourceParts = requestBody.resource.split("/");
            resourceId = resourceParts.pop(); 
        }
    }
    const manifest = `id:${resourceId || ''};request-id:${requestIdHeader || ''};ts:${timestamp};`;
    console.log("validateWebhookSignatureRecommended: String do manifesto para assinatura:", manifest);
    const hmac = crypto.createHmac("sha256", webhookSecret);
    hmac.update(manifest);
    const generatedSignature = hmac.digest("hex");
    console.log("validateWebhookSignatureRecommended: Assinatura recebida (v1):", receivedSignature);
    console.log("validateWebhookSignatureRecommended: Assinatura gerada:", generatedSignature);
    return generatedSignature === receivedSignature;
  } catch (error) {
    console.error("validateWebhookSignatureRecommended: Erro durante a validação da assinatura:", error);
    return false;
  }
}

// --- Funções de envio de e-mail com Resend ---
async function sendPaymentConfirmationEmail(paymentDetails: any, clientEmail: string) {
  const subject = "Confirmação de Pagamento - GFAuto";
  const body = `<p>Olá,</p><p>Seu pagamento para o anúncio no GFAuto foi aprovado com sucesso!</p><p>Detalhes do Pagamento:</p><ul><li>ID do Pagamento MP: ${paymentDetails.id}</li><li>Status: ${paymentDetails.status}</li><li>Valor: ${paymentDetails.transaction_amount} ${paymentDetails.currency_id}</li></ul><p>Em breve você poderá cadastrar os dados do seu anúncio.</p><p>Obrigado,<br>Equipe GFAuto</p>`;
  try {
    console.log(`Tentando enviar e-mail de confirmação para: ${clientEmail} com assunto: ${subject}`);
    const data = await resend.emails.send({
      from: "GFAuto <noreply@gfauto.com.br>", // Seu e-mail verificado no Resend
      to: [clientEmail], // Email do cliente (precisaremos obter isso)
      subject: subject,
      html: body,
    });
    console.log("E-mail de confirmação enviado com sucesso:", data);
  } catch (error) {
    console.error("Erro ao enviar e-mail de confirmação:", error);
  }
}

async function sendAdminPaymentNotification(paymentDetails: any, type: "approved" | "rejected" | "cancelled") {
  const subject = `Notificação de Pagamento: ${type.toUpperCase()} - GFAuto`;
  const body = `<p>Um pagamento foi ${type} no sistema GFAuto.</p><p>Detalhes:</p><ul><li>ID do Pagamento MP: ${paymentDetails.id}</li><li>Status: ${paymentDetails.status}</li><li>Preference ID: ${paymentDetails.preference_id}</li><li>Usuário (se disponível): ${paymentDetails.payer?.email || 'Não disponível'}</li></ul>`;
  const adminEmail = process.env.ADMIN_EMAIL; // Você precisará configurar esta variável de ambiente

  if (!adminEmail) {
    console.warn("ADMIN_EMAIL não configurado. Não é possível enviar notificação para administrador.");
    return;
  }

  try {
    console.log(`Tentando enviar e-mail de notificação para admin: ${adminEmail} com assunto: ${subject}`);
    const data = await resend.emails.send({
      from: "Sistema GFAuto <noreply@gfauto.com.br>",
      to: [adminEmail],
      subject: subject,
      html: body,
    });
    console.log("E-mail de notificação para admin enviado com sucesso:", data);
  } catch (error) {
    console.error("Erro ao enviar e-mail de notificação para admin:", error);
  }
}

// --- Função POST principal (processamento do webhook) ---
export async function POST(request: NextRequest) {
  console.log("--- INÍCIO DA REQUISIÇÃO WEBHOOK MERCADO PAGO (v2.2 - Resend Integration) ---");
  const MERCADOPAGO_WEBHOOK_SECRET_RUNTIME = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  const RESEND_API_KEY_RUNTIME = process.env.RESEND_API_KEY;

  if (!MERCADOPAGO_WEBHOOK_SECRET_RUNTIME) {
    console.error("Erro crítico (v2.2): MERCADOPAGO_WEBHOOK_SECRET não configurada.");
    return NextResponse.json({ error: "Configuração do servidor incompleta (MP Secret)." }, { status: 500 });
  }
  if (!RESEND_API_KEY_RUNTIME) {
    console.error("Erro crítico (v2.2): RESEND_API_KEY não configurada. E-mails não serão enviados.");
    // Não retornamos erro 500 aqui, pois o webhook pode ser processado mesmo sem e-mails
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;
  let requestBodyTextForLog: string = "";

  try {
    const rawBodyForText = await request.clone().text(); 
    requestBodyTextForLog = rawBodyForText;
    body = JSON.parse(requestBodyTextForLog);
    console.log("Corpo da requisição (parseado) (v2.2):", JSON.stringify(body, null, 2));

    const signatureHeader = request.headers.get("x-signature");
    const requestIdHeader = request.headers.get("x-request-id");
    
    const isSignatureValid = validateWebhookSignatureRecommended(signatureHeader, requestIdHeader, body, MERCADOPAGO_WEBHOOK_SECRET_RUNTIME);

    if (!isSignatureValid) {
      console.warn("FALHA NA VALIDAÇÃO DA ASSINATURA (v2.2).");
      return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
    }
    console.log("SUCESSO (v2.2): Assinatura do webhook validada!");

    // Processamento de Eventos
    if (body.type === "payment") {
      const paymentId = body.data?.id;
      if (!paymentId) {
        console.warn("Evento de pagamento (v2.2) sem body.data.id.", body);
      } else {
        console.log(`Evento de pagamento (v2.2) ID: ${paymentId}. Buscando detalhes...`);
        try {
          const paymentDetails = await mercadopagoPayment.get({ id: paymentId });
          console.log("Detalhes do pagamento obtidos (v2.2):", JSON.stringify(paymentDetails, null, 2));
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const preferenceIdFromDetails = (paymentDetails as any)?.preference_id as string | undefined;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const paymentStatus = (paymentDetails as any)?.status as string | undefined;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mercadopagoInternalPaymentId = (paymentDetails as any)?.id?.toString();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const clientEmail = (paymentDetails as any)?.payer?.email as string | undefined;

          if (paymentDetails && preferenceIdFromDetails && paymentStatus) {
            console.log(`Atualizando pagamento no DB (v2.2): Preference ID ${preferenceIdFromDetails}, Status: ${paymentStatus}`);
            await prisma.payment.updateMany({
              where: { mercadopagoPreferenceId: preferenceIdFromDetails },
              data: { status: paymentStatus, mercadopagoPaymentId: mercadopagoInternalPaymentId },
            });
            console.log(`Pagamento com Preference ID ${preferenceIdFromDetails} atualizado (v2.2).`);

            // Lógica de e-mail baseada no status
            if (paymentStatus === "approved") {
              console.log("Pagamento aprovado (v2.2). Disparando e-mails...");
              if (clientEmail) {
                await sendPaymentConfirmationEmail(paymentDetails, clientEmail);
              } else {
                console.warn("E-mail do cliente não encontrado nos detalhes do pagamento. Não é possível enviar confirmação.");
              }
              await sendAdminPaymentNotification(paymentDetails, "approved");
              // Aqui você adicionaria a lógica para liberar o anúncio
              console.log("AÇÃO: Liberar cliente para cadastrar anúncio (Preference ID:", preferenceIdFromDetails, ")");
            } else if (paymentStatus === "rejected" || paymentStatus === "cancelled") {
              console.log(`Pagamento ${paymentStatus} (v2.2). Notificando admin...`);
              await sendAdminPaymentNotification(paymentDetails, paymentStatus);
              // Adicionar lógica se o anúncio já estava publicado e precisa ser removido/suspenso
              console.log("AÇÃO: Verificar se anúncio (Preference ID:", preferenceIdFromDetails, ") precisa ser suspenso/removido.");
            }

          } else {
            console.warn("Detalhes do pagamento, preference_id ou status não encontrados (v2.2).");
          }
        } catch (mpError) {
          console.error("Erro ao buscar detalhes do pagamento no MP (v2.2):", mpError);
        }
      }
    } else if (body.type === "merchant_order") {
      const orderId = body.data?.id || body.resource?.split("/").pop();
      console.log(`Evento de merchant_order (v2.2) recebido para o ID: ${orderId}.`);
      // TODO: Implementar lógica para buscar detalhes da merchant_order e agir conforme o status.
      // Exemplo: se order_status for 'paid', liberar o fluxo do anúncio.
      // const orderDetails = await mercadopago.merchant_orders.get(orderId);
      // if (orderDetails.body.order_status === 'paid') { ... }
      console.log("AÇÃO (merchant_order): Verificar status da ordem e liberar cliente para cadastrar anúncio se aplicável.");

    } else if (body.type === "test_notification") {
        console.log("Recebida notificação de teste (v2.2):", JSON.stringify(body, null, 2));
    } else {
      console.log(`Tipo de evento não processado (v2.2): ${body.type}`);
    }

    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Processada v2.2) ---");
    return NextResponse.json({ received: true, message: "Webhook processado com sucesso (v2.2)." });

  } catch (error) {
    console.error("Erro geral ao processar webhook (v2.2):", error);
    let errorMessage = "Erro desconhecido.";
    let errorDetails = "";
    if (error instanceof Error) {
        errorDetails = error.message;
        if (error instanceof SyntaxError && error.message.includes("JSON")) {
            errorMessage = "Erro: Corpo da requisição não é um JSON válido. Corpo recebido: " + requestBodyTextForLog;
        }
    }
    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Erro Geral v2.2) ---");
    return NextResponse.json({ received: false, error: errorMessage, details: errorDetails }, { status: 500 });
  }
}