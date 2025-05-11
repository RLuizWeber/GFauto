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

  if (!requestIdHeader) {
    // Embora o formato do manifesto inclua request-id, algumas notificações de teste do MP podem não enviá-lo.
    // Se for estritamente necessário, descomente o erro.
    console.warn("validateWebhookSignatureRecommended: Cabeçalho x-request-id ausente. Verifique se é esperado para este tipo de notificação.");
    // return false;
  }

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
    // Tenta extrair resourceId de locais comuns no payload do Mercado Pago
    if (requestBody && typeof requestBody === "object") {
        resourceId = requestBody.data?.id || requestBody.id;
        if (!resourceId && requestBody.resource && typeof requestBody.resource === "string") {
            // Exemplo: "https://api.mercadolibre.com/merchant_orders/1234567890"
            const resourceParts = requestBody.resource.split("/");
            resourceId = resourceParts.pop(); 
        }
    }

    if (!resourceId) {
      // Para notificações de teste ou outros tipos que não têm um ID de recurso óbvio, 
      // o Mercado Pago pode não exigir 'id' no manifesto ou usar um placeholder.
      // Por enquanto, logamos um aviso mas continuamos, pois o MP pode não enviar resourceId para todos os tipos de eventos.
      console.warn("validateWebhookSignatureRecommended: Não foi possível extrair resourceId do corpo da requisição. Corpo:", JSON.stringify(requestBody));
      // Se o resourceId for estritamente necessário para TODOS os webhooks que você espera, retorne false aqui.
      // resourceId = ""; // Ou use um placeholder se a documentação do MP indicar para certos eventos.
    }

    // Construir o manifesto (string a ser assinada)
    // Formato: id:{resourceId};request-id:{requestId};ts:{timestamp};
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
  console.log("--- INÍCIO DA REQUISIÇÃO WEBHOOK MERCADO PAGO (v2 - Recommended Signature) ---");

  const MERCADOPAGO_WEBHOOK_SECRET_RUNTIME = process.env.MERCADOPAGO_WEBHOOK_SECRET;

  console.log("DEBUG POST FN (v2): Raw MERCADOPAGO_WEBHOOK_SECRET_RUNTIME:", MERCADOPAGO_WEBHOOK_SECRET_RUNTIME);
  if (!MERCADOPAGO_WEBHOOK_SECRET_RUNTIME) {
      console.error("Erro crítico (v2): MERCADOPAGO_WEBHOOK_SECRET não está configurada no runtime da função POST.");
      return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  let body: any;
  let requestBodyTextForLog: string = "";

  try {
    // Clonamos a requisição para poder ler o corpo duas vezes se necessário (texto e json)
    // No entanto, para a validação da assinatura, o ideal é usar o corpo parseado para extrair o resourceId.
    const rawBodyForText = await request.clone().text(); 
    requestBodyTextForLog = rawBodyForText;
    console.log("DEBUG POST FN (v2): Raw requestBodyText:", requestBodyTextForLog);
    console.log("DEBUG POST FN (v2): Length requestBodyText:", requestBodyTextForLog.length);

    body = await request.json();
    console.log("Corpo da requisição (parseado) (v2):", JSON.stringify(body, null, 2));

    const signatureHeader = request.headers.get("x-signature");
    const requestIdHeader = request.headers.get("x-request-id"); // Novo: obter x-request-id
    
    console.log(`Header x-signature recebido (v2): ${signatureHeader}`);
    console.log(`Header x-request-id recebido (v2): ${requestIdHeader}`);

    // **Nova lógica de validação da assinatura**
    const isSignatureValid = validateWebhookSignatureRecommended(
      signatureHeader,
      requestIdHeader,
      body, // Passa o corpo já parseado
      MERCADOPAGO_WEBHOOK_SECRET_RUNTIME
    );

    if (!isSignatureValid) {
      console.warn("FALHA NA VALIDAÇÃO DA ASSINATURA (v2 - Recommended Format).");
      return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
    }

    console.log("SUCESSO (v2): Assinatura do webhook validada com o formato recomendado!");

    // Processamento do pagamento (mantido como antes, mas agora após a nova validação)
    if (body.type === "payment") {
      const paymentId = body.data?.id; // Adicionado optional chaining
      if (!paymentId) {
        console.warn("Evento de pagamento recebido, mas sem body.data.id.", body);
      } else {
        console.log(`Evento de pagamento (v2) recebido para o ID: ${paymentId}. Buscando detalhes...`);
        try {
          const paymentDetails = await mercadopagoPayment.get({ id: paymentId });
          console.log("Detalhes do pagamento obtidos (v2):", JSON.stringify(paymentDetails, null, 2));
          
          const preferenceIdFromDetails = paymentDetails?.preference_id as string | undefined;
          const paymentStatus = paymentDetails?.status as string | undefined;
          const mercadopagoInternalPaymentId = paymentDetails?.id?.toString();

          if (paymentDetails && preferenceIdFromDetails && paymentStatus) {
            console.log(`Atualizando pagamento no DB (v2): Preference ID ${preferenceIdFromDetails}, Novo Status: ${paymentStatus}, MP Payment ID: ${mercadopagoInternalPaymentId}`);
            const updatedPayment = await prisma.payment.updateMany({
              where: { mercadopagoPreferenceId: preferenceIdFromDetails },
              data: {
                status: paymentStatus,
                mercadopagoPaymentId: mercadopagoInternalPaymentId,
              },
            });
            if (updatedPayment.count > 0) {
              console.log(`Pagamento com Preference ID ${preferenceIdFromDetails} atualizado (v2).`);
            } else {
              console.warn(`Nenhum pagamento encontrado no DB com Preference ID ${preferenceIdFromDetails} (v2).`);
            }
          } else {
            console.warn("Detalhes do pagamento, preference_id ou status não encontrados (v2).", { preferenceIdFromDetails, paymentStatus, paymentDetails });
          }
        } catch (mpError) {
          console.error("Erro ao buscar detalhes do pagamento no MP (v2):", mpError);
        }
      }
    } else {
      console.log(`Tipo de evento não processado (v2): ${body.type}`);
    }

    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Processada v2) ---");
    return NextResponse.json({ received: true, message: "Webhook processado com sucesso (v2)." });

  } catch (error) {
    console.error("Erro geral ao processar webhook (v2):", error);
    let errorMessage = "Erro desconhecido.";
    let errorDetails = "";
    if (error instanceof Error) {
        errorDetails = error.message;
        if (error instanceof SyntaxError && error.message.includes("JSON")) {
            errorMessage = "Erro: Corpo da requisição não é um JSON válido.";
        }
    }
    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Erro Geral v2) ---");
    return NextResponse.json({ received: false, error: errorMessage, details: errorDetails }, { status: 500 });
  }
}