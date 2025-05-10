import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from "mercadopago";
import crypto from "crypto";

const prisma = new PrismaClient();

const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const mercadopagoPayment = new MercadoPagoPayment(mpClient);

// Log inicial para verificar a variável de ambiente no momento do carregamento do módulo
console.log("DEBUG MODULE LOAD: Raw process.env.MERCADOPAGO_WEBHOOK_SECRET:", process.env.MERCADOPAGO_WEBHOOK_SECRET);
if (process.env.MERCADOPAGO_WEBHOOK_SECRET) {
    console.log("DEBUG MODULE LOAD: Length process.env.MERCADOPAGO_WEBHOOK_SECRET:", process.env.MERCADOPAGO_WEBHOOK_SECRET.length);
    console.log("DEBUG MODULE LOAD: Hex process.env.MERCADOPAGO_WEBHOOK_SECRET:", Buffer.from(process.env.MERCADOPAGO_WEBHOOK_SECRET, 'utf8').toString('hex'));
} else {
    console.log("DEBUG MODULE LOAD: process.env.MERCADOPAGO_WEBHOOK_SECRET is undefined or null");
}

export async function POST(request: Request) {
  console.log("--- INÍCIO DA REQUISIÇÃO WEBHOOK MERCADO PAGO ---");

  const MERCADOPAGO_WEBHOOK_SECRET_RUNTIME = process.env.MERCADOPAGO_WEBHOOK_SECRET;

  // Logs detalhados para a chave secreta DENTRO da função POST
  console.log("DEBUG POST FN: Raw MERCADOPAGO_WEBHOOK_SECRET_RUNTIME:", MERCADOPAGO_WEBHOOK_SECRET_RUNTIME);
  if (MERCADOPAGO_WEBHOOK_SECRET_RUNTIME) {
      console.log("DEBUG POST FN: Length MERCADOPAGO_WEBHOOK_SECRET_RUNTIME:", MERCADOPAGO_WEBHOOK_SECRET_RUNTIME.length);
      console.log("DEBUG POST FN: Hex MERCADOPAGO_WEBHOOK_SECRET_RUNTIME:", Buffer.from(MERCADOPAGO_WEBHOOK_SECRET_RUNTIME, 'utf8').toString('hex'));
  } else {
      console.error("Erro crítico: MERCADOPAGO_WEBHOOK_SECRET não está configurada no runtime da função POST.");
      return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  try {
    const requestBodyText = await request.text();
    // Logs detalhados para requestBodyText
    console.log("DEBUG POST FN: Raw requestBodyText:", requestBodyText);
    console.log("DEBUG POST FN: Length requestBodyText:", requestBodyText.length);
    console.log("DEBUG POST FN: Hex requestBodyText:", Buffer.from(requestBodyText, 'utf8').toString('hex'));

    const body = JSON.parse(requestBodyText);
    console.log("Corpo da requisição (parseado):", JSON.stringify(body, null, 2));

    const signatureHeader = request.headers.get("x-signature");
    if (!signatureHeader) {
      console.warn("Alerta: Requisição sem header x-signature.");
      return NextResponse.json({ error: "Assinatura ausente." }, { status: 400 });
    }
    console.log(`Header x-signature recebido: ${signatureHeader}`);

    const parts = signatureHeader.split(",");
    const ts = parts.find(part => part.startsWith("ts="))?.split("=")[1];
    const v1 = parts.find(part => part.startsWith("v1="))?.split("=")[1];

    if (!ts || !v1) {
      console.warn("Alerta: Formato inválido do header x-signature.");
      return NextResponse.json({ error: "Formato de assinatura inválido." }, { status: 400 });
    }

    // Usando o formato ts;body
    const stringToSign = `ts:${ts};body:${requestBodyText}`;
    // Logs detalhados para stringToSign
    console.log("DEBUG POST FN: Raw stringToSign:", stringToSign);
    console.log("DEBUG POST FN: Length stringToSign:", stringToSign.length);
    console.log("DEBUG POST FN: Hex stringToSign:", Buffer.from(stringToSign, 'utf8').toString('hex'));

    const calculatedSignature = crypto.createHmac("sha256", MERCADOPAGO_WEBHOOK_SECRET_RUNTIME)
                                    .update(stringToSign)
                                    .digest("hex");

    console.log("Assinatura calculada:", calculatedSignature);
    console.log("Assinatura recebida (v1):", v1);

    if (calculatedSignature !== v1) {
      console.warn("FALHA NA VALIDAÇÃO DA ASSINATURA.");
      return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
    }

    console.log("SUCESSO: Assinatura do webhook validada!");

    // Processamento do pagamento (mantido como antes)
    if (body.type === "payment") {
      const paymentId = body.data.id;
      console.log(`Evento de pagamento recebido para o ID: ${paymentId}. Buscando detalhes...`);
      try {
        const paymentDetails = await mercadopagoPayment.get({ id: paymentId });
        console.log("Detalhes do pagamento obtidos:", JSON.stringify(paymentDetails, null, 2));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const preferenceIdFromDetails = (paymentDetails as any)?.preference_id as string | undefined;
        if (paymentDetails && preferenceIdFromDetails) {
          const preferenceId = preferenceIdFromDetails;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const paymentStatus = (paymentDetails as any)?.status as string | undefined;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mercadopagoInternalPaymentId = (paymentDetails as any)?.id?.toString();

          if (!paymentStatus) {
            console.warn("Status do pagamento não encontrado nos detalhes.");
          } else {
            console.log(`Atualizando pagamento no DB: Preference ID ${preferenceId}, Novo Status: ${paymentStatus}, MP Payment ID: ${mercadopagoInternalPaymentId}`);
            const updatedPayment = await prisma.payment.updateMany({
              where: { mercadopagoPreferenceId: preferenceId },
              data: {
                status: paymentStatus,
                mercadopagoPaymentId: mercadopagoInternalPaymentId,
              },
            });
            if (updatedPayment.count > 0) {
              console.log(`Pagamento com Preference ID ${preferenceId} atualizado.`);
            } else {
              console.warn(`Nenhum pagamento encontrado no DB com Preference ID ${preferenceId}.`);
            }
          }
        } else {
          console.warn("Detalhes do pagamento ou preference_id não encontrados.");
        }
      } catch (mpError) {
        console.error("Erro ao buscar detalhes do pagamento no MP:", mpError);
      }
    } else {
      console.log(`Tipo de evento não processado: ${body.type}`);
    }

    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Processada) ---");
    return NextResponse.json({ received: true, message: "Webhook processado com sucesso." });

  } catch (error) {
    console.error("Erro geral ao processar webhook:", error);
    let errorMessage = "Erro desconhecido.";
    let errorDetails = "";
    if (error instanceof Error) {
        errorDetails = error.message;
        if (error instanceof SyntaxError && error.message.includes("JSON")) {
            errorMessage = "Erro: Corpo da requisição não é um JSON válido.";
        }
    }
    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Erro Geral) ---");
    return NextResponse.json({ received: false, error: errorMessage, details: errorDetails }, { status: 500 });
  }
}