/**
 * API para envio de e-mail de confirmação
 * POST: Envia e-mail de confirmação para o anunciante
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { advertiserId, email, nomeResponsavel } = await request.json();

    console.log('=== INICIO API EMAIL ===');
    console.log('Dados recebidos:', { advertiserId, email, nomeResponsavel });

    if (!advertiserId || !email) {
      return NextResponse.json(
        { error: "ID do anunciante e e-mail são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se a API key existe antes de criar a instância
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY não encontrada nas variáveis de ambiente');
      return NextResponse.json(
        { error: "Configuração de e-mail não encontrada" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Gerar token único para confirmação
    const confirmationToken = crypto.randomBytes(32).toString('hex');
    const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    // Salvar token no banco - por enquanto vamos usar campos existentes
    await prisma.advertiser.update({
      where: { id: advertiserId },
      data: {
        // Vamos usar o campo slogan temporariamente para o token
        slogan: `token:${confirmationToken}:${expirationTime.getTime()}`,
        updatedAt: new Date()
      }
    });

    // URL de confirmação
    const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/advertiser/confirm-email?token=${confirmationToken}`;

    // Template do e-mail
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Confirme seu e-mail - GFauto</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background: #f9fafb; }
            .button { 
              display: inline-block; 
              background: #1e40af; 
              color: white; 
              padding: 12px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0; 
            }
            .footer { text-align: center; color: #666; font-size: 12px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚗 GFauto</h1>
              <p>Confirme seu e-mail para ativar sua conta</p>
            </div>
            
            <div class="content">
              <h2>Olá, ${nomeResponsavel || 'Anunciante'}!</h2>
              
              <p>Bem-vindo ao <strong>GFauto</strong>! Sua plataforma para anunciar serviços automotivos.</p>
              
              <p>Para concluir seu cadastro e ativar sua conta, clique no botão abaixo:</p>
              
              <div style="text-align: center;">
                <a href="${confirmationUrl}" class="button">
                  ✅ Confirmar E-mail
                </a>
              </div>
              
              <p>Ou copie e cole este link no seu navegador:</p>
              <p style="word-break: break-all; background: #e5e7eb; padding: 10px; border-radius: 4px;">
                ${confirmationUrl}
              </p>
              
              <p><strong>Este link é válido por 24 horas.</strong></p>
              
              <hr style="margin: 30px 0;">
              
              <h3>Próximos passos após a confirmação:</h3>
              <ol>
                <li>Complete seu perfil com dados da empresa</li>
                <li>Crie seu primeiro anúncio</li>
                <li>Comece a receber clientes!</li>
              </ol>
            </div>
            
            <div class="footer">
              <p>Se você não criou esta conta, pode ignorar este e-mail.</p>
              <p>© 2025 GFauto - Plataforma de Serviços Automotivos</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar e-mail
    // Usar domínio verificado do cliente
    const fromEmail = 'GFauto <noreply@gfauto.com.br>';

    console.log('=== CONFIGURAÇÃO EMAIL ===');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length);
    console.log('RESEND_API_KEY first 10 chars:', process.env.RESEND_API_KEY?.substring(0, 10));
    console.log('From email:', fromEmail);
    console.log('To:', email);
    console.log('Subject: 🚗 Confirme seu e-mail - GFauto');

    // Verificar se a API key existe
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY não configurada');
      return NextResponse.json(
        { error: "RESEND_API_KEY não configurada" },
        { status: 500 }
      );
    }

    try {
      const emailResponse = await resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: '🚗 Confirme seu e-mail - GFauto',
        html: emailHtml
        // Removido replyTo para simplificar o teste
      });

      console.log('=== RESPOSTA RESEND ===');
      console.log('Email response:', JSON.stringify(emailResponse, null, 2));

      if (emailResponse.error) {
        console.error('Erro do Resend:', emailResponse.error);
        return NextResponse.json(
          { error: "Erro ao enviar e-mail", details: emailResponse.error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "E-mail de confirmação enviado com sucesso",
        emailResponse: emailResponse.data || emailResponse
      });

    } catch (emailError) {
      console.error('Erro na chamada do Resend:', emailError);
      return NextResponse.json(
        { error: "Erro ao enviar e-mail", details: String(emailError) },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return NextResponse.json(
      { error: "Erro ao enviar e-mail de confirmação" },
      { status: 500 }
    );
  }
}
