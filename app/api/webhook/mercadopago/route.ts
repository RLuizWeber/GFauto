import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MercadoPagoConfig, Payment as MercadoPagoPayment, MerchantOrder } from "mercadopago";
import crypto from "crypto";
import { Resend } from "resend";

const prisma = new PrismaClient();

// Configuração do Mercado Pago Segunda de noite
const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const mercadopagoPayment = new MercadoPagoPayment(mpClient);
const mercadopagoMerchantOrder = new MerchantOrder(mpClient);

// Configuração do Resend Segunda-Feira
const resend = new Resend(process.env.RESEND_API_KEY);

console.log("DEBUG MODULE LOAD (v2.8): Raw process.env.MERCADOPAGO_WEBHOOK_SECRET:", process.env.MERCADOPAGO_WEBHOOK_SECRET);
console.log("DEBUG MODULE LOAD (v2.8): Raw process.env.RESEND_API_KEY:", process.env.RESEND_API_KEY ? "Configurada" : "NÃO CONFIGURADA");
console.log("DEBUG MODULE LOAD (v2.8): Raw process.env.GF_PRIMARY_ADMIN_EMAIL:", process.env.GF_PRIMARY_ADMIN_EMAIL ? "Configurado" : "NÃO CONFIGURADO");
console.log("DEBUG MODULE LOAD (v2.8): Raw process.env.GFAUTO_TEST_VAR:", process.env.GFAUTO_TEST_VAR ? process.env.GFAUTO_TEST_VAR : "NÃO CONFIGURADO"); // Nova variável de teste

function validateWebhookSignatureRecommended(
  signatureHeader: string | null,
  requestIdHeader: string | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBody: any,
  webhookSecret: string
): boolean {
  if (!webhookSecret) {
    console.error("validateWebhookSignatureRecommended (v2.8): MERCADOPAGO_WEBHOOK_SECRET não está configurado.");
    return false;
  }
  if (!signatureHeader) {
    console.error("validateWebhookSignatureRecommended (v2.8): Cabeçalho x-signature ausente.");
    return false;
  }
  try {
    const parts = signatureHeader.split(",");
    const tsPart = parts.find(part => part.startsWith("ts="));
    const v1Part = parts.find(part => part.startsWith("v1="));
    if (!tsPart || !v1Part) {
      console.error("validateWebhookSignatureRecommended (v2.8): Formato inválido do cabeçalho x-signature. Recebido:", signatureHeader);
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
    console.log("validateWebhookSignatureRecommended (v2.8): String do manifesto para assinatura:", manifest);
    const hmac = crypto.createHmac("sha256", webhookSecret);
    hmac.update(manifest);
    const generatedSignature = hmac.digest("hex");
    console.log("validateWebhookSignatureRecommended (v2.8): Assinatura recebida (v1):", receivedSignature);
    console.log("validateWebhookSignatureRecommended (v2.8): Assinatura gerada:", generatedSignature);
    return generatedSignature === receivedSignature;
  } catch (error) {
    console.error("validateWebhookSignatureRecommended (v2.8): Erro durante a validação da assinatura:", error);
    return false;
  }
}

async function sendEmail(to: string, subject: string, html: string, fromAlias: string = "GFAuto") {
  const fromEmail = "noreply@gfauto.com.br"; 
  try {
    console.log(`Tentando enviar e-mail para: ${to} com assunto: ${subject} de ${fromAlias} (v2.8)`);
    const data = await resend.emails.send({
      from: `${fromAlias} <${fromEmail}>`,
      to: [to],
      subject: subject,
      html: html,
    });
    if (data.error) {
        console.error("Erro retornado pelo Resend ao enviar e-mail (v2.8):", data.error);
    } else {
        console.log("E-mail enviado com sucesso via Resend (v2.8). Resposta:", data.data?.id ? `ID: ${data.data.id}` : JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error(`Erro ao enviar e-mail para ${to} com assunto ${subject} (v2.8):`, error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendAdminNotification(subject: string, htmlBody: string, details?: any) {
  const adminEmail = process.env.GF_PRIMARY_ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("GF_PRIMARY_ADMIN_EMAIL não configurado (v2.8). Não é possível enviar notificação para administrador.");
    return;
  }
  let fullHtmlBody = htmlBody;
  if (details) {
    fullHtmlBody += `<p>Detalhes Adicionais (Corpo do Webhook/Recurso):</p><pre>${JSON.stringify(details, null, 2)}</pre>`;
  }
  await sendEmail(adminEmail, subject, fullHtmlBody, "Sistema GFAuto");
}

export async function POST(request: NextRequest) {
  console.log("--- INÍCIO DA REQUISIÇÃO WEBHOOK MERCADO PAGO (v2.8 - GFAUTO_TEST_VAR Attempt) ---");
  const MERCADOPAGO_WEBHOOK_SECRET_RUNTIME = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  const RESEND_API_KEY_RUNTIME = process.env.RESEND_API_KEY;
  const GF_PRIMARY_ADMIN_EMAIL_RUNTIME = process.env.GF_PRIMARY_ADMIN_EMAIL;
  const GFAUTO_TEST_VAR_RUNTIME = process.env.GFAUTO_TEST_VAR; // Nova variável de teste

  console.log("RUNTIME CHECK (v2.8): GF_PRIMARY_ADMIN_EMAIL:", GF_PRIMARY_ADMIN_EMAIL_RUNTIME ? "Lida" : "NÃO LIDA");
  console.log("RUNTIME CHECK (v2.8): GFAUTO_TEST_VAR:", GFAUTO_TEST_VAR_RUNTIME ? GFAUTO_TEST_VAR_RUNTIME : "NÃO LIDA");

  if (!MERCADOPAGO_WEBHOOK_SECRET_RUNTIME) {
    console.error("Erro crítico (v2.8): MERCADOPAGO_WEBHOOK_SECRET não configurada.");
    return NextResponse.json({ error: "Configuração do servidor incompleta (MP Secret)." }, { status: 500 });
  }
  if (!RESEND_API_KEY_RUNTIME) {
    console.error("Erro crítico (v2.8): RESEND_API_KEY não configurada. E-mails não serão enviados.");
  }
  if (!GF_PRIMARY_ADMIN_EMAIL_RUNTIME) {
    console.error("Erro crítico (v2.8): GF_PRIMARY_ADMIN_EMAIL não configurado. Notificações para admin não serão enviadas.");
  }
  if (!GFAUTO_TEST_VAR_RUNTIME) {
    console.warn("Aviso (v2.8): GFAUTO_TEST_VAR não configurada ou não lida.");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;
  let requestBodyTextForLog: string = "";

  try {
    requestBodyTextForLog = await request.clone().text();
    body = JSON.parse(requestBodyTextForLog);
    console.log("Corpo da requisição (parseado) (v2.8):", JSON.stringify(body, null, 2));

    const signatureHeader = request.headers.get("x-signature");
    const requestIdHeader = request.headers.get("x-request-id");

    const isSignatureValid = validateWebhookSignatureRecommended(signatureHeader, requestIdHeader, body, MERCADOPAGO_WEBHOOK_SECRET_RUNTIME);

    if (!isSignatureValid) {
      console.warn("FALHA NA VALIDAÇÃO DA ASSINATURA (v2.8).");
      return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
    }
    console.log("SUCESSO (v2.8): Assinatura do webhook validada!");

    const eventType = body.type;
    const eventAction = body.action; 
    const resourceId = body.data?.id || body.id; 

    console.log(`Evento recebido (v2.8): Tipo: ${eventType}, Ação: ${eventAction}, ID Recurso: ${resourceId}`);

    if (eventType === "payment") {
      if (!resourceId) {
        console.warn("Evento de pagamento (v2.8) sem ID do recurso.", body);
      } else {
        console.log(`Processando evento de pagamento (v2.8) ID: ${resourceId}.`);
        try {
          const paymentDetails = await mercadopagoPayment.get({ id: resourceId });
          console.log("Detalhes do pagamento obtidos (v2.8):", JSON.stringify(paymentDetails, null, 2));

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const preferenceId = (paymentDetails as any)?.preference_id as string | undefined;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const paymentStatus = (paymentDetails as any)?.status as string | undefined;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mercadopagoInternalPaymentId = (paymentDetails as any)?.id?.toString();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const clientEmail = (paymentDetails as any)?.payer?.email as string | undefined;

          if (preferenceId && paymentStatus) {
            console.log(`Atualizando pagamento no DB (v2.8): Preference ID ${preferenceId}, Status: ${paymentStatus}`);
            await prisma.payment.updateMany({
              where: { mercadopagoPreferenceId: preferenceId },
              data: { status: paymentStatus, mercadopagoPaymentId: mercadopagoInternalPaymentId },
            });
            console.log(`Pagamento com Preference ID ${preferenceId} atualizado (v2.8).`);

            if (paymentStatus === "approved") {
              console.log("Pagamento aprovado (v2.8). Disparando e-mails...");
              if (clientEmail) {
                const emailHtml = `<p>Olá,</p><p>Seu pagamento para o anúncio no GFAuto foi aprovado com sucesso!</p><p>Detalhes do Pagamento:</p><ul><li>ID do Pagamento MP: ${paymentDetails.id}</li><li>Status: ${paymentDetails.status}</li><li>Valor: ${paymentDetails.transaction_amount} ${paymentDetails.currency_id}</li></ul><p>Em breve você poderá cadastrar os dados do seu anúncio.</p><p>Obrigado,<br>Equipe GFAuto</p>`;
                await sendEmail(clientEmail, "Confirmação de Pagamento - GFAuto", emailHtml);
              }
              await sendAdminNotification("Pagamento Aprovado - GFAuto", `<p>Pagamento aprovado para Preference ID: ${preferenceId}.</p>`, paymentDetails);
              console.log("AÇÃO (v2.8): Liberar cliente para cadastrar anúncio (Preference ID:", preferenceId, ")");
            } else if (paymentStatus === "rejected" || paymentStatus === "cancelled") {
              console.log(`Pagamento ${paymentStatus} (v2.8). Notificando admin...`);
              await sendAdminNotification(`Pagamento ${paymentStatus} - GFAuto`, `<p>Pagamento ${paymentStatus} para Preference ID: ${preferenceId}.</p>`, paymentDetails);
              console.log("AÇÃO (v2.8): Verificar se anúncio (Preference ID:", preferenceId, ") precisa ser suspenso/removido.");
            }
          } else {
            console.warn("Detalhes do pagamento, preference_id ou status não encontrados (v2.8).");
          }
        } catch (mpError) {
          console.error("Erro ao buscar/processar detalhes do pagamento no MP (v2.8):", mpError);
          await sendAdminNotification("Erro Webhook Pagamento MP - GFAuto", `<p>Erro ao processar webhook de pagamento ID ${resourceId}.</p><p>Erro: ${mpError instanceof Error ? mpError.message : JSON.stringify(mpError)}</p>`, body);
        }
      }
    } else if (eventType === "merchant_order") {
      if (!resourceId) {
        console.warn("Evento de merchant_order (v2.8) sem ID do recurso.", body);
      } else {
        console.log(`Processando evento de merchant_order (v2.8) ID: ${resourceId}.`);
        try {
          const orderDetails = await mercadopagoMerchantOrder.get({ merchantOrderId: resourceId });
          console.log("Detalhes da merchant_order obtidos (v2.8):", JSON.stringify(orderDetails, null, 2));
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const orderStatus = (orderDetails as any)?.order_status as string | undefined;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const preferenceId = (orderDetails as any)?.preference_id as string | undefined;

          if (orderStatus === "paid") {
            console.log(`Merchant Order (ID: ${resourceId}, Preference ID: ${preferenceId}) está PAGA (v2.8).`);
            await sendAdminNotification("Merchant Order Paga - GFAuto", `<p>Merchant Order (ID: ${resourceId}, Preference ID: ${preferenceId}) foi paga.</p>`, orderDetails);
            console.log("AÇÃO (v2.8): Liberar cliente para cadastrar anúncio (Preference ID:", preferenceId, ") com base na Merchant Order.");
          } else {
            console.log(`Merchant Order (ID: ${resourceId}) status: ${orderStatus} (v2.8). Nenhuma ação específica por enquanto.`);
          }
        } catch (mpError) {
          console.error("Erro ao buscar/processar detalhes da merchant_order no MP (v2.8):", mpError);
          await sendAdminNotification("Erro Webhook Merchant Order MP - GFAuto", `<p>Erro ao processar webhook de merchant_order ID ${resourceId}.</p><p>Erro: ${mpError instanceof Error ? mpError.message : JSON.stringify(mpError)}</p>`, body);
        }
      }
    } else if (eventType === "refund") {
        const paymentIdForRefund = body.payment_id || body.data?.payment_id; 
        console.log(`Processando evento de refund (v2.8). ID do Reembolso: ${resourceId}, ID do Pagamento Original: ${paymentIdForRefund}.`);
        
        if (!paymentIdForRefund) {
            console.warn("Evento de refund (v2.8) sem payment_id associado no corpo do webhook.", body);
            await sendAdminNotification("Webhook de Reembolso Incompleto - GFAuto", `<p>Webhook de reembolso (ID: ${resourceId}) recebido sem payment_id.</p>`, body);
        } else {
            console.log(`AÇÃO (v2.8): Atualizar status no DB para "refunded" para o Pagamento ID: ${paymentIdForRefund} devido ao Reembolso ID: ${resourceId}.`);
            await sendAdminNotification("Reembolso Processado - GFAuto", `<p>Um reembolso (ID do Reembolso: ${resourceId}) foi processado para o pagamento (ID do Pagamento: ${paymentIdForRefund}).</p>`, body);
        }
    } else if (eventType === "chargeback") {
        console.log(`Processando evento de chargeback (v2.8) para o Recurso (Pagamento) ID: ${resourceId}.`);
        if (!resourceId) {
            console.warn("Evento de chargeback (v2.8) sem ID do recurso (pagamento contestado).", body);
            await sendAdminNotification("Webhook de Chargeback Incompleto - GFAuto", `<p>Webhook de chargeback recebido sem ID do recurso (pagamento).</p>`, body);
        } else {
            console.log(`AÇÃO URGENTE (v2.8): Chargeback recebido para Pagamento ID: ${resourceId}. Suspender anúncio e investigar.`);
            await sendAdminNotification("ALERTA: Chargeback Recebido - GFAuto", `<p>Um chargeback foi recebido para o pagamento ID: ${resourceId}.</p><p>Verifique imediatamente e tome as ações necessárias (ex: suspender anúncio).</p>`, body);
        }
    } else if (eventType === "test_notification") {
      console.log("Recebida notificação de teste (v2.8):", JSON.stringify(body, null, 2));
    } else {
      console.log(`Tipo de evento não processado (v2.8): ${eventType}, Ação: ${eventAction}`);
      await sendAdminNotification("Webhook MP: Evento Não Processado - GFAuto", `<p>Recebido evento não processado: Tipo ${eventType}, Ação ${eventAction}.</p>`, body);
    }

    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Processada v2.8) ---");
    return NextResponse.json({ received: true, message: "Webhook processado com sucesso (v2.8)." });

  } catch (error) {
    console.error("Erro geral ao processar webhook (v2.8):", error);
    let errorMessage = "Erro desconhecido.";
    let errorDetails = "";
    if (error instanceof Error) {
      errorDetails = error.message;
      if (error instanceof SyntaxError && error.message.includes("JSON")) {
        errorMessage = "Erro: Corpo da requisição não é um JSON válido. Corpo recebido: " + requestBodyTextForLog;
      }
    }
    await sendAdminNotification("Erro Crítico Webhook MP - GFAuto", `<p>Erro geral ao processar webhook.</p><p>Erro: ${errorMessage} (${errorDetails})</p><p>Corpo Recebido: ${requestBodyTextForLog}</p>`, null);
    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Erro Geral v2.8) ---");
    return NextResponse.json({ received: false, error: errorMessage, details: errorDetails }, { status: 500 });
  }
}