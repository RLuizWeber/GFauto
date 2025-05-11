import { NextResponse, NextRequest } from "next/server";
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
} else {
    console.log("DEBUG MODULE LOAD: process.env.MERCADOPAGO_WEBHOOK_SECRET is undefined or null");
}

/**
 * Valida a assinatura de um webhook do Mercado Pago usando o formato recomendado.
 * @param signatureHeader O valor do cabeçalho 'x-signature'.
 * @param requestIdHeader O valor do cabeçalho 'x-request-id'.
 * @param requestBody O corpo da requisição (payload do webhook) como objeto parseado.
 * @param webhookSecret A chave secreta do webhook.
 * @returns True se a assinatura for válida, false caso contrário.
 */
function validateWebhookSignatureRecommended(
  signatureHeader: string | null,
  requestIdHeader: string | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBody: any, // Corpo já parseado
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

  // O requestIdHeader pode ser nulo para algumas notificações (ex: teste do painel MP)
  // if (!requestIdHeader) {
  //   console.warn("validateWebhookSignatureRecommended: Cabeçalho x-request-id ausente. Verifique se é esperado para este tipo de notificação.");
  //   // return false; // Descomente se for estritamente necessário
  // }

  try {
    const parts = signatureHeader.split(",");
    const tsPart = parts.find(part => part.startsWith("ts="));
    const v1Part = parts.find(part => part.startsWith("v1="));

    if (!tsPart || !v1Part) {
      console.error("validateWebhookSignatureRecommended: Formato inválido do cabeçalho x-signature. Esperado \"ts=...,v1=...\". Recebido:", signatureHeader);
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

    // Para o formato de manifesto id:{resourceId};request-id:{requestId};ts:{timestamp};
    // Se resourceId não for encontrado, usamos uma string vazia, pois alguns webhooks (como o de teste do painel)
    // podem não ter um ID de recurso explícito no corpo principal ou podem não enviar o `data.id`.
    // O request-id também pode ser nulo em alguns cenários de teste.
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

export async function POST(request: NextRequest) {
  console.log("--- INÍCIO DA REQUISIÇÃO WEBHOOK MERCADO PAGO (v2.1 - Recommended Signature with ESLint fixes) ---");

  const MERCADOPAGO_WEBHOOK_SECRET_RUNTIME = process.env.MERCADOPAGO_WEBHOOK_SECRET;

  console.log("DEBUG POST FN (v2.1): Raw MERCADOPAGO_WEBHOOK_SECRET_RUNTIME:", MERCADOPAGO_WEBHOOK_SECRET_RUNTIME);
  if (!MERCADOPAGO_WEBHOOK_SECRET_RUNTIME) {
      console.error("Erro crítico (v2.1): MERCADOPAGO_WEBHOOK_SECRET não está configurada no runtime da função POST.");
      return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;
  let requestBodyTextForLog: string = ""; // Para logar o corpo bruto em caso de erro de parse

  try {
    const rawBodyForText = await request.clone().text(); 
    requestBodyTextForLog = rawBodyForText;
    console.log("DEBUG POST FN (v2.1): Raw requestBodyText:", requestBodyTextForLog);
    console.log("DEBUG POST FN (v2.1): Length requestBodyText:", requestBodyTextForLog.length);

    body = JSON.parse(requestBodyTextForLog); // Usar o texto logado para parsear
    console.log("Corpo da requisição (parseado) (v2.1):", JSON.stringify(body, null, 2));

    const signatureHeader = request.headers.get("x-signature");
    const requestIdHeader = request.headers.get("x-request-id");
    
    console.log(`Header x-signature recebido (v2.1): ${signatureHeader}`);
    console.log(`Header x-request-id recebido (v2.1): ${requestIdHeader}`);

    const isSignatureValid = validateWebhookSignatureRecommended(
      signatureHeader,
      requestIdHeader,
      body, // Passa o corpo já parseado
      MERCADOPAGO_WEBHOOK_SECRET_RUNTIME
    );

    if (!isSignatureValid) {
      console.warn("FALHA NA VALIDAÇÃO DA ASSINATURA (v2.1 - Recommended Format).");
      return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
    }

    console.log("SUCESSO (v2.1): Assinatura do webhook validada com o formato recomendado!");

    if (body.type === "payment") {
      const paymentId = body.data?.id;
      if (!paymentId) {
        console.warn("Evento de pagamento recebido (v2.1), mas sem body.data.id.", body);
        // Mesmo sem paymentId, podemos querer retornar um 200 OK se a assinatura foi válida
        // para que o Mercado Pago não continue reenviando a notificação.
        // Ou, se um paymentId é absolutamente essencial para qualquer processamento,
        // poderíamos retornar um erro aqui, mas isso pode fazer o MP reenviar indefinidamente.
        // Por enquanto, apenas logamos e continuamos para o 200 OK.
      } else {
        console.log(`Evento de pagamento (v2.1) recebido para o ID: ${paymentId}. Buscando detalhes...`);
        try {
          const paymentDetails = await mercadopagoPayment.get({ id: paymentId });
          console.log("Detalhes do pagamento obtidos (v2.1):", JSON.stringify(paymentDetails, null, 2));
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const preferenceIdFromDetails = (paymentDetails as any)?.preference_id as string | undefined;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const paymentStatus = (paymentDetails as any)?.status as string | undefined;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mercadopagoInternalPaymentId = (paymentDetails as any)?.id?.toString();

          if (paymentDetails && preferenceIdFromDetails && paymentStatus) {
            console.log(`Atualizando pagamento no DB (v2.1): Preference ID ${preferenceIdFromDetails}, Novo Status: ${paymentStatus}, MP Payment ID: ${mercadopagoInternalPaymentId}`);
            const updatedPayment = await prisma.payment.updateMany({
              where: { mercadopagoPreferenceId: preferenceIdFromDetails },
              data: {
                status: paymentStatus,
                mercadopagoPaymentId: mercadopagoInternalPaymentId,
              },
            });
            if (updatedPayment.count > 0) {
              console.log(`Pagamento com Preference ID ${preferenceIdFromDetails} atualizado (v2.1).`);
            } else {
              console.warn(`Nenhum pagamento encontrado no DB com Preference ID ${preferenceIdFromDetails} (v2.1).`);
            }
          } else {
            console.warn("Detalhes do pagamento, preference_id ou status não encontrados (v2.1).", { preferenceIdFromDetails, paymentStatus, paymentDetails });
          }
        } catch (mpError) {
          console.error("Erro ao buscar detalhes do pagamento no MP (v2.1):", mpError);
          // Não retornar erro 500 aqui, pois a notificação foi validada.
          // Logar o erro e retornar 200 para o MP não ficar reenviando.
        }
      }
    } else if (body.type === "test_notification") {
        console.log("Recebida notificação de teste (v2.1):", JSON.stringify(body, null, 2));
        // Para notificações de teste, geralmente não há 'data.id' ou 'resourceId' da mesma forma que em pagamentos.
        // A validação da assinatura já foi feita, então aqui é só registrar que o teste foi recebido.
    } else {
      console.log(`Tipo de evento não processado (v2.1): ${body.type}`);
    }

    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Processada v2.1) ---");
    return NextResponse.json({ received: true, message: "Webhook processado com sucesso (v2.1)." });

  } catch (error) {
    console.error("Erro geral ao processar webhook (v2.1):", error);
    let errorMessage = "Erro desconhecido.";
    let errorDetails = "";
    if (error instanceof Error) {
        errorDetails = error.message;
        if (error instanceof SyntaxError && error.message.includes("JSON")) {
            errorMessage = "Erro: Corpo da requisição não é um JSON válido. Corpo recebido: " + requestBodyTextForLog;
        }
    }
    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Erro Geral v2.1) ---");
    return NextResponse.json({ received: false, error: errorMessage, details: errorDetails }, { status: 500 });
  }
}