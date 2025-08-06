/**
 * API para recuperação de senha via email
 * POST: Envia email de recuperação de senha
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { cpf } = await request.json();

    console.log('=== RECUPERAÇÃO DE SENHA ===');
    console.log('CPF recebido:', cpf);

    if (!cpf) {
      return NextResponse.json(
        { error: "CPF é obrigatório" },
        { status: 400 }
      );
    }

    // Remover formatação do CPF
    const cpfLimpo = cpf.replace(/\D/g, '');

    // Buscar anunciante pelo CPF
    const advertiser = await prisma.advertiser.findFirst({
      where: { cpf: cpfLimpo }
    });

    if (!advertiser) {
      // Por segurança, sempre retorna sucesso mesmo se CPF não existir
      return NextResponse.json({
        success: true,
        message: "Se o CPF estiver cadastrado, você receberá um email com instruções para recuperar sua senha."
      });
    }

    // Verificar se a API key existe
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY não encontrada nas variáveis de ambiente');
      return NextResponse.json(
        { error: "Configuração de e-mail não encontrada" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Gerar token único para recuperação
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expirationTime = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hora

    // Salvar token no banco (usando campo slogan temporariamente)
    await prisma.advertiser.update({
      where: { id: advertiser.id },
      data: {
        // Usando slogan para armazenar token de reset
        slogan: `reset:${resetToken}:${expirationTime.getTime()}`,
        updatedAt: new Date()
      }
    });

    // URL de reset
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gfauto.vercel.app';
    const resetUrl = `${baseUrl}/advertiser/reset-password?token=${resetToken}`;

    // Template do e-mail
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Recuperar Senha - GFauto</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background: #f9fafb; }
            .button { 
              display: inline-block; 
              background: #dc2626; 
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
              <h1>🔐 GFauto</h1>
              <p>Recuperação de Senha</p>
            </div>
            
            <div class="content">
              <h2>Olá, ${advertiser.nomeResponsavel || 'Anunciante'}!</h2>
              
              <p>Recebemos uma solicitação para redefinir a senha da sua conta no <strong>GFauto</strong>.</p>
              
              <p>Para criar uma nova senha, clique no botão abaixo:</p>
              
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">
                  🔄 Redefinir Senha
                </a>
              </div>
              
              <p>Ou copie e cole este link no seu navegador:</p>
              <p style="word-break: break-all; background: #e5e7eb; padding: 10px; border-radius: 4px;">
                ${resetUrl}
              </p>
              
              <p><strong>Este link é válido por 1 hora.</strong></p>
              
              <hr style="margin: 30px 0;">
              
              <p><strong>⚠️ Importante:</strong></p>
              <ul>
                <li>Se você não solicitou esta recuperação, ignore este email</li>
                <li>Sua senha atual continuará funcionando normalmente</li>
                <li>Por segurança, não compartilhe este link com ninguém</li>
              </ul>
            </div>
            
            <div class="footer">
              <p>Se você não solicitou esta recuperação, pode ignorar este email.</p>
              <p>© 2025 GFauto - Plataforma de Serviços Automotivos</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar e-mail
    const fromEmail = 'GFauto <noreply@gfauto.com.br>';

    try {
      const emailResponse = await resend.emails.send({
        from: fromEmail,
        to: [advertiser.email],
        subject: '🔐 Recuperar Senha - GFauto',
        html: emailHtml
      });

      console.log('=== EMAIL RECUPERAÇÃO ENVIADO ===');
      console.log('Email response:', JSON.stringify(emailResponse, null, 2));

      if (emailResponse.error) {
        console.error('Erro do Resend:', emailResponse.error);
        return NextResponse.json(
          { error: "Erro ao enviar e-mail de recuperação" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Se o CPF estiver cadastrado, você receberá um email com instruções para recuperar sua senha."
      });

    } catch (emailError) {
      console.error('Erro na chamada do Resend:', emailError);
      return NextResponse.json(
        { error: "Erro ao enviar e-mail de recuperação" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Erro ao processar recuperação de senha:', error);
    return NextResponse.json(
      { error: "Erro ao processar solicitação de recuperação" },
      { status: 500 }
    );
  }
}
