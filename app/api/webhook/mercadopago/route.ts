import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MercadoPagoConfig, Payment as MercadoPagoPayment, MerchantOrder } from "mercadopago";
import crypto from "crypto";
import { Resend } from "resend";

const prisma = new PrismaClient();

// Configuração do Mercado Pago
const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const mercadopagoPayment = new MercadoPagoPayment(mpClient);
const mercadopagoMerchantOrder = new MerchantOrder(mpClient);

// Configuração do Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Logs de inicialização do módulo - Versão 2.9.2
console.log("DEBUG MODULE LOAD (v2.9.2): Raw process.env.MERCADOPAGO_WEBHOOK_SECRET:", process.env.MERCADOPAGO_WEBHOOK_SECRET);
console.log("DEBUG MODULE LOAD (v2.9.2): Raw process.env.RESEND_API_KEY:", process.env.RESEND_API_KEY ? "Configurada" : "NÃO CONFIGURADA");
console.log("DEBUG MODULE LOAD (v2.9.2): Raw process.env.GF_PRIMARY_ADMIN_EMAIL:", process.env.GF_PRIMARY_ADMIN_EMAIL ? "Configurado" : "NÃO CONFIGURADO");
console.log("DEBUG MODULE LOAD (v2.9.2): Raw process.env.GFAUTO_TEST_VAR:", process.env.GFAUTO_TEST_VAR ? process.env.GFAUTO_TEST_VAR : "NÃO CONFIGURADO");

function validateWebhookSignatureRecommended(
  signatureHeader: string | null,
  requestIdHeader: string | null,
  requestBody: any,
  webhookSecret: string
): boolean {
  if (!webhookSecret) {
    console.error("validateWebhookSignatureRecommended (v2.9.2): MERCADOPAGO_WEBHOOK_SECRET não está configurado.");
    return false;
  }
  if (!signatureHeader) {
    console.error("validateWebhookSignatureRecommended (v2.9.2): Cabeçalho x-signature ausente.");
    return false;
  }
  try {
    const parts = signatureHeader.split(",");
    const tsPart = parts.find(part => part.startsWith("ts="));
    const v1Part = parts.find(part => part.startsWith("v1="));
    if (!tsPart || !v1Part) {
      console.error("validateWebhookSignatureRecommended (v2.9.2): Formato inválido do cabeçalho x-signature. Recebido:", signatureHeader);
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
    console.log("validateWebhookSignatureRecommended (v2.9.2): String do manifesto para assinatura:", manifest);
    const hmac = crypto.createHmac("sha256", webhookSecret);
    hmac.update(manifest);
    const generatedSignature = hmac.digest("hex");
    console.log("validateWebhookSignatureRecommended (v2.9.2): Assinatura recebida (v1):", receivedSignature);
    console.log("validateWebhookSignatureRecommended (v2.9.2): Assinatura gerada:", generatedSignature);
    return generatedSignature === receivedSignature;
  } catch (error) {
    console.error("validateWebhookSignatureRecommended (v2.9.2): Erro durante a validação da assinatura:", error);
    return false;
  }
}

async function sendEmail(to: string, subject: string, html: string, fromAlias: string = "GFAuto") {
  const fromEmail = "noreply@gfauto.com.br"; 
  try {
    console.log(`Tentando enviar e-mail para: ${to} com assunto: ${subject} de ${fromAlias} (v2.9.2)`);
    const data = await resend.emails.send({
      from: `${fromAlias} <${fromEmail}>`,
      to: [to],
      subject: subject,
      html: html,
    });
    if (data.error) {
        console.error("Erro retornado pelo Resend ao enviar e-mail (v2.9.2):", data.error);
    } else {
        console.log("E-mail enviado com sucesso via Resend (v2.9.2). Resposta:", data.data?.id ? `ID: ${data.data.id}` : JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error(`Erro ao enviar e-mail para ${to} com assunto ${subject} (v2.9.2):`, error);
    throw error;
  }
}

async function sendAdminNotification(subject: string, htmlBody: string, details?: any) {
  const adminEmail = process.env.GF_PRIMARY_ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("GF_PRIMARY_ADMIN_EMAIL não configurado (v2.9.2). Não é possível enviar notificação para administrador.");
    return;
  }
  let fullHtmlBody = htmlBody;
  if (details) {
    fullHtmlBody += `<p>Detalhes Adicionais (Corpo do Webhook/Recurso):</p><pre>${JSON.stringify(details, null, 2)}</pre>`;
  }
  await sendEmail(adminEmail, subject, fullHtmlBody, "Sistema GFAuto");
}

export async function POST(request: NextRequest) {
  console.log("--- INÍCIO DA REQUISIÇÃO WEBHOOK MERCADO PAGO (v2.9.2) ---");
  const MERCADOPAGO_WEBHOOK_SECRET_RUNTIME = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  const RESEND_API_KEY_RUNTIME = process.env.RESEND_API_KEY;
  const GF_PRIMARY_ADMIN_EMAIL_RUNTIME = process.env.GF_PRIMARY_ADMIN_EMAIL;
  const GFAUTO_TEST_VAR_RUNTIME = process.env.GFAUTO_TEST_VAR;

  console.log("RUNTIME CHECK (v2.9.2): GF_PRIMARY_ADMIN_EMAIL:", GF_PRIMARY_ADMIN_EMAIL_RUNTIME ? "Lida" : "NÃO LIDA");
  console.log("RUNTIME CHECK (v2.9.2): GFAUTO_TEST_VAR:", GFAUTO_TEST_VAR_RUNTIME ? GFAUTO_TEST_VAR_RUNTIME : "NÃO LIDA");

  if (!MERCADOPAGO_WEBHOOK_SECRET_RUNTIME) {
    console.error("Erro crítico (v2.9.2): MERCADOPAGO_WEBHOOK_SECRET não configurada.");
    return NextResponse.json({ error: "Configuração do servidor incompleta (MP Secret)." }, { status: 500 });
  }
  // Outras verificações de variáveis de ambiente permanecem...

  let body: any;
  let requestBodyTextForLog: string = "";

  try {
    requestBodyTextForLog = await request.clone().text();
    body = JSON.parse(requestBodyTextForLog);
    console.log("Corpo da requisição (parseado) (v2.9.2):", JSON.stringify(body, null, 2));

    const signatureHeader = request.headers.get("x-signature");
    const requestIdHeader = request.headers.get("x-request-id");

    const isSignatureValid = validateWebhookSignatureRecommended(signatureHeader, requestIdHeader, body, MERCADOPAGO_WEBHOOK_SECRET_RUNTIME);

    if (!isSignatureValid) {
      console.warn("FALHA NA VALIDAÇÃO DA ASSINATURA (v2.9.2).");
      return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
    }
    console.log("SUCESSO (v2.9.2): Assinatura do webhook validada!");

    const eventType = body.type;
    const eventAction = body.action; 
    const resourceId = body.data?.id || body.id; 

    console.log(`Evento recebido (v2.9.2): Tipo: ${eventType}, Ação: ${eventAction}, ID Recurso: ${resourceId}`);

    if (eventType === "payment") {
      if (!resourceId) {
        console.warn("Evento de pagamento (v2.9.2) sem ID do recurso.", body);
        await sendAdminNotification("Webhook Pagamento MP: ID Recurso Ausente - GFAuto", `<p>Evento de pagamento recebido sem ID do recurso.</p>`, body);
      } else {
        console.log(`Processando evento de pagamento (v2.9.2) ID: ${resourceId}.`);
        try {
          const paymentDetails = await mercadopagoPayment.get({ id: resourceId });
          console.log("Detalhes do pagamento obtidos (v2.9.2):", JSON.stringify(paymentDetails, null, 2));

          const preferenceId = (paymentDetails as any)?.preference_id as string | undefined;
          const paymentStatus = (paymentDetails as any)?.status as string | undefined;
          const mercadopagoInternalPaymentId = (paymentDetails as any)?.id?.toString();
          const clientEmail = (paymentDetails as any)?.payer?.email as string | undefined;
          const payerFirstName = (paymentDetails as any)?.payer?.first_name as string | undefined;
          const payerLastName = (paymentDetails as any)?.payer?.last_name as string | undefined;
          const clientName = payerFirstName ? `${payerFirstName} ${payerLastName || ''}`.trim() : "Cliente";

          if (preferenceId && paymentStatus) {
            console.log(`Atualizando pagamento no DB (v2.9.2): Preference ID ${preferenceId}, Status: ${paymentStatus}`);
            await prisma.payment.updateMany({
              where: { mercadopagoPreferenceId: preferenceId },
              data: { status: paymentStatus.toUpperCase(), mercadopagoPaymentId: mercadopagoInternalPaymentId },
            });
            console.log(`Pagamento com Preference ID ${preferenceId} atualizado para ${paymentStatus.toUpperCase()} (v2.9.2).`);

            const anuncio = await prisma.anuncio.findUnique({
              where: { mercadopagoPreferenceId: preferenceId }, 
              // Inclua campos do anúncio que possam descrever o plano, ex: select: { tituloPlano: true, duracaoMeses: true }
              // Adapte 'tituloPlano' e 'duracaoMeses' para os nomes reais dos campos no seu schema Anuncio
            });

            if (!anuncio && paymentStatus === "approved") { // Adicionado para notificar admin se anúncio não for encontrado em pagamento aprovado
                console.warn(`ALERTA (v2.9.2): Anúncio com Preference ID ${preferenceId} não encontrado no DB, mas pagamento foi aprovado.`);
                await sendAdminNotification("ALERTA: Anúncio Não Encontrado para Pagamento Aprovado - GFAuto", 
                    `<p>Um pagamento foi aprovado para a Preference ID <strong>${preferenceId}</strong>, mas nenhum anúncio correspondente foi encontrado no banco de dados.</p><p>Por favor, verifique esta inconsistência.</p>`, 
                    paymentDetails);
            }

            if (paymentStatus === "approved") {
              console.log("Pagamento aprovado (v2.9.2). Disparando e-mails e atualizando anúncio...");
              if (anuncio && anuncio.status !== "PUBLICADO" && anuncio.status !== "AGUARDANDO_CADASTRO") { 
                await prisma.anuncio.update({
                  where: { id: anuncio.id },
                  data: { status: "AGUARDANDO_CADASTRO" }, 
                });
                console.log(`Anúncio (ID DB: ${anuncio.id}) atualizado para AGUARDANDO_CADASTRO (v2.9.2).`);
              } else if (anuncio) {
                console.log(`Anúncio (ID DB: ${anuncio.id}) já está ${anuncio.status}. Nenhuma atualização de status do anúncio necessária por aprovação de pagamento (v2.9.2).`);
              }
              // Lógica de e-mail ao cliente para pagamento aprovado
              if (clientEmail) {
                let planoInfo = "";
                // Exemplo: if (anuncio && anuncio.tituloPlano) planoInfo = ` Plano: ${anuncio.tituloPlano}`;
                // Adapte para buscar a informação do plano do seu objeto 'anuncio'
                const emailHtml = `<p>Olá ${clientName},</p><p>Seu pagamento para o anúncio no GFAuto foi aprovado com sucesso!</p><p>Detalhes do Pagamento:</p><ul><li>ID do Pagamento MP: ${paymentDetails.id}</li><li>Status: ${paymentDetails.status}</li><li>Valor: ${paymentDetails.transaction_amount} ${paymentDetails.currency_id}</li></ul><p>Em breve você poderá cadastrar os dados do seu anúncio${planoInfo}.</p><p>Obrigado,<br>Equipe GFAuto</p>`;
                await sendEmail(clientEmail, "Confirmação de Pagamento - GFAuto", emailHtml);
              }
              await sendAdminNotification("Pagamento Aprovado - GFAuto", `<p>Pagamento aprovado para Preference ID: ${preferenceId}.</p>`, paymentDetails);
            } else if (paymentStatus === "rejected" || paymentStatus === "cancelled") {
              console.log(`Pagamento ${paymentStatus} (v2.9.2). Notificando admin...`);
              if (anuncio && anuncio.status === "PUBLICADO") {
                await prisma.anuncio.update({
                  where: { id: anuncio.id },
                  data: { status: "PAGAMENTO_PROBLEMA" }, 
                });
                console.log(`Anúncio (ID DB: ${anuncio.id}) que estava publicado foi marcado como PAGAMENTO_PROBLEMA devido a pagamento ${paymentStatus} (v2.9.2).`);
              } else if (anuncio) {
                console.log(`Anúncio (ID DB: ${anuncio.id}) status: ${anuncio.status}. Nenhuma atualização de status do anúncio necessária por pagamento ${paymentStatus} (v2.9.2).`);
              } else if (preferenceId) { // Notificar admin se anúncio não for encontrado para pagamento rejeitado/cancelado
                 console.warn(`ALERTA (v2.9.2): Anúncio com Preference ID ${preferenceId} não encontrado no DB para pagamento ${paymentStatus}.`);
                 await sendAdminNotification("ALERTA: Anúncio Não Encontrado para Pagamento Rejeitado/Cancelado - GFAuto", 
                    `<p>Um pagamento com status '${paymentStatus}' foi recebido para a Preference ID <strong>${preferenceId}</strong>, mas nenhum anúncio correspondente foi encontrado no banco de dados.</p><p>Por favor, verifique esta inconsistência.</p>`, 
                    paymentDetails);
              }
              await sendAdminNotification(`Pagamento ${paymentStatus} - GFAuto`, `<p>Pagamento ${paymentStatus} para Preference ID: ${preferenceId}.</p>`, paymentDetails);
            }
            // Adicionar tratamento para outros status de pagamento (pending, in_process) apenas atualizando o DB, conforme discutido.
            else if (['pending', 'in_process', 'authorized', 'in_mediation'].includes(paymentStatus)) {
                console.log(`Pagamento com status '${paymentStatus}' (v2.9.2) para Preference ID ${preferenceId}. Apenas atualizando DB.`);
                // A atualização do status do pagamento no DB já foi feita no início do bloco `if (preferenceId && paymentStatus)`
                // Nenhuma ação adicional no anúncio ou notificação específica para estes status, conforme Ponto 4.
            }

          } else {
            console.warn("Detalhes do pagamento, preference_id ou status não encontrados (v2.9.2).", paymentDetails);
            await sendAdminNotification("Webhook Pagamento MP: Dados Incompletos - GFAuto", `<p>Detalhes do pagamento (preference_id ou status) não encontrados para o recurso ID ${resourceId}.</p>`, paymentDetails);
          }
        } catch (mpError) {
          console.error("Erro ao buscar/processar detalhes do pagamento no MP (v2.9.2):", mpError);
          await sendAdminNotification("Erro Webhook Pagamento MP - GFAuto", `<p>Erro ao processar webhook de pagamento ID ${resourceId}.</p><p>Erro: ${mpError instanceof Error ? mpError.message : JSON.stringify(mpError)}</p>`, body);
        }
      }
    } else if (eventType === "merchant_order") {
      if (!resourceId) {
        console.warn("Evento de merchant_order (v2.9.2) sem ID do recurso.", body);
        await sendAdminNotification("Webhook MP: Merchant Order ID Recurso Ausente - GFAuto", `<p>Evento de merchant_order recebido sem ID do recurso.</p>`, body);
      } else {
        console.log(`Processando evento de merchant_order (v2.9.2) ID: ${resourceId}.`);
        try {
          const orderDetails = await mercadopagoMerchantOrder.get({ merchantOrderId: resourceId });
          console.log("Detalhes da merchant_order obtidos (v2.9.2):", JSON.stringify(orderDetails, null, 2));
          const orderStatus = (orderDetails as any)?.order_status as string | undefined;
          const preferenceId = (orderDetails as any)?.preference_id as string | undefined;

          if (orderStatus === "paid") {
            console.log(`Merchant Order (ID: ${resourceId}, Preference ID: ${preferenceId}) está PAGA (v2.9.2). Apenas notificando admin.`);
            await sendAdminNotification("Merchant Order Paga (Info) - GFAuto", `<p>Merchant Order (ID: ${resourceId}, Preference ID: ${preferenceId}) foi paga. Esta é uma notificação informativa, a liberação do anúncio é tratada pelo evento de pagamento individual.</p>`, orderDetails);
          } else {
            console.log(`Merchant Order (ID: ${resourceId}) status: ${orderStatus} (v2.9.2). Nenhuma ação específica por enquanto, apenas log.`);
          }
        } catch (mpError) {
          console.error("Erro ao buscar/processar detalhes da merchant_order no MP (v2.9.2):", mpError);
          await sendAdminNotification("Erro Webhook Merchant Order MP - GFAuto", `<p>Erro ao processar webhook de merchant_order ID ${resourceId}.</p><p>Erro: ${mpError instanceof Error ? mpError.message : JSON.stringify(mpError)}</p>`, body);
        }
      }
    } else if (eventType === "refund") {
      if (!resourceId) {
        console.warn("Evento de refund (v2.9.2) sem ID do recurso.", body);
        await sendAdminNotification("Webhook MP: Refund ID Recurso Ausente - GFAuto", `<p>Evento de refund recebido sem ID do recurso.</p>`, body);
      } else {
        console.log(`Processando evento de refund (v2.9.2) ID: ${resourceId}.`);
        try {
          // Buscar detalhes do reembolso
          const refundDetails = await fetch(`https://api.mercadopago.com/v1/payments/${resourceId}/refunds`, {
            headers: {
              "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
            }
          }).then(res => res.json());
          console.log("Detalhes do refund obtidos (v2.9.2):", JSON.stringify(refundDetails, null, 2));

          // Identificar o ID do pagamento original que foi reembolsado
          const originalPaymentId = resourceId; // O ID do recurso geralmente é o ID do pagamento original

          if (originalPaymentId) {
            // Buscar o pagamento original no banco de dados
            const pagamentoOriginal = await prisma.payment.findUnique({
              where: { mercadopagoPaymentId: originalPaymentId.toString() }
            });

            if (pagamentoOriginal) {
              console.log(`Pagamento original encontrado no DB (v2.9.2): ID ${pagamentoOriginal.id}, Preference ID: ${pagamentoOriginal.mercadopagoPreferenceId}`);
              
              // Atualizar o status do pagamento para "refunded"
              await prisma.payment.update({
                where: { id: pagamentoOriginal.id },
                data: { status: "REFUNDED" }
              });
              console.log(`Status do pagamento atualizado para REFUNDED (v2.9.2).`);

              // Buscar o anúncio associado a este pagamento
              const anuncio = await prisma.anuncio.findUnique({
                where: { mercadopagoPreferenceId: pagamentoOriginal.mercadopagoPreferenceId }
              });

              if (anuncio) {
                console.log(`Anúncio encontrado (v2.9.2): ID ${anuncio.id}, Status atual: ${anuncio.status}`);
                
                // Se o anúncio estava publicado, atualizar seu status
                if (anuncio.status === "PUBLICADO") {
                  await prisma.anuncio.update({
                    where: { id: anuncio.id },
                    data: { status: "REEMBOLSADO_POS_PUBLICACAO" }
                  });
                  console.log(`Status do anúncio atualizado para REEMBOLSADO_POS_PUBLICACAO (v2.9.2).`);
                } else {
                  console.log(`Anúncio não estava publicado (status: ${anuncio.status}), mantendo status atual (v2.9.2).`);
                }
              } else {
                console.warn(`ALERTA (v2.9.2): Anúncio não encontrado para o pagamento reembolsado (Preference ID: ${pagamentoOriginal.mercadopagoPreferenceId}).`);
                await sendAdminNotification("ALERTA: Anúncio Não Encontrado para Reembolso - GFAuto", 
                  `<p>Um pagamento foi reembolsado (ID: ${originalPaymentId}), mas o anúncio associado à Preference ID <strong>${pagamentoOriginal.mercadopagoPreferenceId}</strong> não foi encontrado no banco de dados.</p><p>Por favor, verifique esta inconsistência.</p>`, 
                  refundDetails);
              }

              // Notificar o administrador sobre o reembolso
              await sendAdminNotification("Reembolso Processado - GFAuto", `<p>Reembolso processado para o pagamento ID: ${originalPaymentId}, Preference ID: ${pagamentoOriginal.mercadopagoPreferenceId}.</p>`, refundDetails);
            } else {
              console.warn(`ALERTA (v2.9.2): Pagamento original (ID: ${originalPaymentId}) não encontrado no DB para o reembolso.`);
              await sendAdminNotification("ALERTA: Pagamento Não Encontrado para Reembolso - GFAuto", 
                `<p>Um reembolso foi processado para o pagamento ID <strong>${originalPaymentId}</strong>, mas este pagamento não foi encontrado no banco de dados.</p><p>Por favor, verifique esta inconsistência.</p>`, 
                refundDetails);
            }
          } else {
            console.warn("ID do pagamento original não identificado para o reembolso (v2.9.2).");
            await sendAdminNotification("Webhook Reembolso MP: Dados Incompletos - GFAuto", `<p>ID do pagamento original não identificado para o reembolso ID ${resourceId}.</p>`, refundDetails);
          }
        } catch (mpError) {
          console.error("Erro ao processar evento de reembolso (v2.9.2):", mpError);
          await sendAdminNotification("Erro Webhook Reembolso MP - GFAuto", `<p>Erro ao processar webhook de reembolso ID ${resourceId}.</p><p>Erro: ${mpError instanceof Error ? mpError.message : JSON.stringify(mpError)}</p>`, body);
        }
      }
    } else if (eventType === "chargeback") {
      if (!resourceId) {
        console.warn("Evento de chargeback (v2.9.2) sem ID do recurso.", body);
        await sendAdminNotification("Webhook MP: Chargeback ID Recurso Ausente - GFAuto", `<p>Evento de chargeback recebido sem ID do recurso.</p>`, body);
      } else {
        console.log(`Processando evento de chargeback (v2.9.2) ID: ${resourceId}.`);
        try {
          // O resourceId geralmente é o ID do pagamento contestado
          const paymentIdContestado = resourceId;
          
          // Buscar o pagamento contestado no banco de dados
          const pagamentoContestado = await prisma.payment.findUnique({
            where: { mercadopagoPaymentId: paymentIdContestado.toString() }
          });

          if (pagamentoContestado) {
            console.log(`Pagamento contestado encontrado no DB (v2.9.2): ID ${pagamentoContestado.id}, Preference ID: ${pagamentoContestado.mercadopagoPreferenceId}`);
            
            // Atualizar o status do pagamento para "charged_back"
            await prisma.payment.update({
              where: { id: pagamentoContestado.id },
              data: { status: "CHARGED_BACK" }
            });
            console.log(`Status do pagamento atualizado para CHARGED_BACK (v2.9.2).`);

            // Buscar o anúncio associado a este pagamento
            const anuncio = await prisma.anuncio.findUnique({
              where: { mercadopagoPreferenceId: pagamentoContestado.mercadopagoPreferenceId }
            });

            if (anuncio) {
              console.log(`Anúncio encontrado (v2.9.2): ID ${anuncio.id}, Status atual: ${anuncio.status}`);
              
              // Se o anúncio estava publicado ou aguardando cadastro, suspender
              if (anuncio.status === "PUBLICADO" || anuncio.status === "AGUARDANDO_CADASTRO") {
                await prisma.anuncio.update({
                  where: { id: anuncio.id },
                  data: { status: "SUSPENSO_CHARGEBACK" }
                });
                console.log(`Status do anúncio atualizado para SUSPENSO_CHARGEBACK (v2.9.2).`);
              } else {
                console.log(`Anúncio não estava publicado ou aguardando cadastro (status: ${anuncio.status}), mantendo status atual (v2.9.2).`);
              }
            } else {
              console.warn(`ALERTA (v2.9.2): Anúncio não encontrado para o pagamento contestado (Preference ID: ${pagamentoContestado.mercadopagoPreferenceId}).`);
              await sendAdminNotification("ALERTA: Anúncio Não Encontrado para Chargeback - GFAuto", 
                `<p>Um pagamento sofreu chargeback (ID: ${paymentIdContestado}), mas o anúncio associado à Preference ID <strong>${pagamentoContestado.mercadopagoPreferenceId}</strong> não foi encontrado no banco de dados.</p><p>Por favor, verifique esta inconsistência.</p>`, 
                body);
            }

            // Notificar o administrador sobre o chargeback (ALERTA)
            await sendAdminNotification("ALERTA: Chargeback Detectado - GFAuto", `<p>ATENÇÃO: Um chargeback foi detectado para o pagamento ID: ${paymentIdContestado}, Preference ID: ${pagamentoContestado.mercadopagoPreferenceId}.</p><p>Este é um caso que requer atenção imediata.</p>`, body);
          } else {
            console.warn(`ALERTA (v2.9.2): Pagamento contestado (ID: ${paymentIdContestado}) não encontrado no DB para o chargeback.`);
            await sendAdminNotification("ALERTA: Pagamento Não Encontrado para Chargeback - GFAuto", 
              `<p>Um chargeback foi detectado para o pagamento ID <strong>${paymentIdContestado}</strong>, mas este pagamento não foi encontrado no banco de dados.</p><p>Por favor, verifique esta inconsistência.</p>`, 
              body);
          }
        } catch (error) {
          console.error("Erro ao processar evento de chargeback (v2.9.2):", error);
          await sendAdminNotification("Erro Webhook Chargeback MP - GFAuto", `<p>Erro ao processar webhook de chargeback ID ${resourceId}.</p><p>Erro: ${error instanceof Error ? error.message : JSON.stringify(error)}</p>`, body);
        }
      }
    } else if (eventType === "test") {
      console.log("Notificação de teste recebida (v2.9.2).");
      await sendAdminNotification("Notificação de Teste MP - GFAuto", `<p>Uma notificação de teste foi recebida do Mercado Pago.</p>`, body);
    } else {
      console.log(`Tipo de evento não tratado especificamente (v2.9.2): ${eventType}`);
      await sendAdminNotification("Webhook MP: Tipo Não Tratado - GFAuto", `<p>Evento de tipo não tratado especificamente: ${eventType}.</p>`, body);
    }

    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Processada v2.9.2) ---");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao processar webhook (v2.9.2):", error);
    try {
      await sendAdminNotification("Erro Crítico Webhook MP - GFAuto", `<p>Erro crítico ao processar webhook.</p><p>Erro: ${error instanceof Error ? error.message : JSON.stringify(error)}</p><p>Corpo da requisição:</p><pre>${requestBodyTextForLog}</pre>`, null);
    } catch (emailError) {
      console.error("Erro ao enviar e-mail de notificação de erro (v2.9.2):", emailError);
    }
    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Erro v2.9.2) ---");
    return NextResponse.json({ error: "Erro interno ao processar webhook." }, { status: 500 });
  }
}