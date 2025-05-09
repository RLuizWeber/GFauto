import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from "mercadopago";
import crypto from "crypto";

// Comentário para forçar deploy

const prisma = new PrismaClient();

const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const mercadopagoPayment = new MercadoPagoPayment(mpClient);

const MERCADOPAGO_WEBHOOK_SECRET = process.env.MERCADOPAGO_WEBHOOK_SECRET;

console.log("DEBUG: Valor de MERCADOPAGO_WEBHOOK_SECRET no runtime:", MERCADOPAGO_WEBHOOK_SECRET);

export async function POST(request: Request) {
  console.log("--- INÍCIO DA REQUISIÇÃO WEBHOOK MERCADO PAGO ---");
  console.log("DEBUG INTERNO: Valor de process.env.MERCADOPAGO_WEBHOOK_SECRET:", process.env.MERCADOPAGO_WEBHOOK_SECRET);

  if (!MERCADOPAGO_WEBHOOK_SECRET) {
    console.error("Erro crítico: MERCADOPAGO_WEBHOOK_SECRET não está configurada.");
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  try {
    const requestBodyText = await request.text();
    console.log("DEBUG: requestBodyText CRU:", JSON.stringify(requestBodyText));

    const body = JSON.parse(requestBodyText);
    console.log("Corpo da requisição (payload) do webhook recebido (parseado):", JSON.stringify(body, null, 2));

    const signatureHeader = request.headers.get("x-signature");
    // const requestId = request.headers.get("x-request-id"); // Não usaremos requestId nesta tentativa

    if (!signatureHeader) {
      console.warn("Alerta de segurança: Requisição de webhook sem header x-signature.");
      return NextResponse.json({ error: "Assinatura ausente." }, { status: 400 });
    }

    console.log(`Headers recebidos: x-signature: ${signatureHeader}`); // Removido requestId do log aqui

    const parts = signatureHeader.split(",");
    const ts = parts.find(part => part.startsWith("ts="))?.split("=")[1];
    const v1 = parts.find(part => part.startsWith("v1="))?.split("=")[1];

    if (!ts || !v1) {
      console.warn("Alerta de segurança: Formato inválido do header x-signature.");
      return NextResponse.json({ error: "Formato de assinatura inválido." }, { status: 400 });
    }

    // TENTATIVA COM TEMPLATE MAIS SIMPLES: id da notificação e ts
    // Usando body.id (ID da notificação) em vez de body.data.id (ID do recurso)
    const templateToSign = `id:${body.id};ts:${ts};`;
    console.log("DEBUG: templateToSign (SIMPLIFICADO - usando body.id, sem request-id):", JSON.stringify(templateToSign));

    const stringCompletaParaAssinar = templateToSign + requestBodyText;
    console.log("DEBUG: stringCompletaParaAssinar (com template SIMPLIFICADO):", JSON.stringify(stringCompletaParaAssinar));

    const calculatedSignature = crypto.createHmac("sha256", MERCADOPAGO_WEBHOOK_SECRET)
                                    .update(stringCompletaParaAssinar)
                                    .digest("hex");

    if (calculatedSignature !== v1) {
      console.warn("Alerta de segurança: Assinatura do webhook inválida (com template SIMPLIFICADO).");
      console.log("  Template usado (SIMPLIFICADO):", templateToSign);
      console.log("  Assinatura calculada:", calculatedSignature);
      console.log("  Assinatura recebida (v1):", v1);
      return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
    }

    console.log("Assinatura do webhook validada com sucesso (com template SIMPLIFICADO)! Processando pagamento...");

    // O restante do código de processamento do pagamento permanece o mesmo
    if (body.type === "payment") {
      const paymentId = body.data.id; // ID do pagamento (do campo data.id)
      console.log(`Evento de pagamento recebido para o ID: ${paymentId}. Buscando detalhes...`);

      try {
        const paymentDetails = await mercadopagoPayment.get({ id: paymentId });
        console.log("Detalhes do pagamento obtidos do Mercado Pago:", JSON.stringify(paymentDetails, null, 2));
        
        const preferenceIdFromDetails = (paymentDetails as any)?.preference_id as string | undefined;

        if (paymentDetails && preferenceIdFromDetails) {
          const preferenceId = preferenceIdFromDetails;
          const paymentStatus = (paymentDetails as any)?.status as string | undefined;
          const mercadopagoInternalPaymentId = (paymentDetails as any)?.id?.toString();

          if (!paymentStatus) {
            console.warn("Status do pagamento não encontrado nos detalhes do Mercado Pago.");
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
              console.log(`Pagamento com Preference ID ${preferenceId} atualizado com sucesso.`);
            } else {
              console.warn(`Nenhum pagamento encontrado no DB com Preference ID ${preferenceId}.`);
            }
          }
        } else {
          console.warn("Detalhes do pagamento ou preference_id não encontrados.");
        }
      } catch (mpError) {
        console.error("Erro ao buscar detalhes do pagamento no Mercado Pago:", mpError);
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
    return NextResponse.json({ received: false, error: errorMessage, details: errorDetails }, { status: 500 });
  }
}
