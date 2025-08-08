/**
 * API para envio de e-mail de boas-vindas após criação do anúncio
 * POST: Envia e-mail de boas-vindas para o anunciante
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { 
      email, 
      nomeResponsavel, 
      especialidade, 
      plano, 
      dataExpiracao, 
      anuncioUrl 
    } = await request.json();

    console.log('=== INICIO EMAIL BOAS-VINDAS ===');
    console.log('Dados recebidos:', { email, nomeResponsavel, especialidade, plano });

    if (!email || !nomeResponsavel || !especialidade || !plano) {
      return NextResponse.json(
        { error: "Dados obrigatórios: email, nome, especialidade e plano" },
        { status: 400 }
      );
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

    // Calcular período de validade e data de expiração
    const hoje = new Date();
    let anosValidade = 1; // Default: 1 ano
    let diasValidade = 365;
    
    if (plano.toLowerCase().includes('premium')) {
      // Para premium, verificar se há especificação de anos no plano
      if (plano.toLowerCase().includes('2') || plano.toLowerCase().includes('dois')) {
        anosValidade = 2;
        diasValidade = 730;
      } else if (plano.toLowerCase().includes('3') || plano.toLowerCase().includes('tres') || plano.toLowerCase().includes('três')) {
        anosValidade = 3;
        diasValidade = 1095;
      } else {
        anosValidade = 1;
        diasValidade = 365;
      }
    }
    
    const dataVencimento = dataExpiracao ? new Date(dataExpiracao) : new Date(hoje.getTime() + (diasValidade * 24 * 60 * 60 * 1000));
    const dataFormatada = dataVencimento.toLocaleDateString('pt-BR');
    const textoValidade = `${anosValidade} ano${anosValidade > 1 ? 's' : ''} com vencimento em: ${dataFormatada}`;

    // Template do e-mail
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Bem-vindo ao GFauto!</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; color: white; text-align: center; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .highlight { background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; }
        .button { display: inline-block; background-color: #dc2626; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 10px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Parabéns, ${nomeResponsavel}!</h1>
          <p>Seu anúncio foi criado com sucesso!</p>
        </div>
        
        <div class="content">
          <h2>Detalhes do seu anúncio:</h2>
          
          <div class="highlight">
            <p><strong>📍 Especialidade:</strong> ${especialidade}</p>
            <p><strong>⭐ Plano:</strong> ${plano}</p>
            <p><strong>📅 Validade:</strong> ${textoValidade}</p>
            <p><strong>🌐 Status:</strong> Publicado e disponível para visualização</p>
          </div>
          
          <h3>O que você pode fazer agora:</h3>
          <ul>
            <li>✅ Seu anúncio já está aparecendo nos resultados de busca</li>
            <li>🔧 Acesse seu painel para gerenciar o anúncio</li>
            <li>📊 Acompanhe visualizações e contatos</li>
            <li>✏️ Edite suas informações quando necessário</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${anuncioUrl}" class="button">Ver Meu Anúncio</a>
            <br>
            <a href="https://gfauto.vercel.app/painel" class="button">Acessar Painel de Controle</a>
          </div>
          
          <div class="footer">
            <p>Em caso de dúvidas, entre em contato conosco.</p>
            <p><strong>Equipe GFauto</strong><br>
            🌐 <a href="https://gfauto.vercel.app">gfauto.vercel.app</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    // Enviar e-mail
    const emailData = {
      from: `GFauto <noreply@${process.env.RESEND_VERIFIED_DOMAIN || 'gfauto.com.br'}>`,
      to: [email],
      subject: `🎉 Seu anúncio em ${especialidade} foi publicado com sucesso!`,
      html: htmlContent,
    };

    console.log('Enviando e-mail para:', email);
    
    const result = await resend.emails.send(emailData);
    
    console.log('Resultado do envio:', result);
    console.log('=== FIM EMAIL BOAS-VINDAS ===');

    return NextResponse.json({
      success: true,
      message: "E-mail de boas-vindas enviado com sucesso",
      emailId: result.data?.id
    });

  } catch (error) {
    console.error('Erro ao enviar e-mail de boas-vindas:', error);
    return NextResponse.json(
      { 
        success: false,
        error: "Erro interno ao enviar e-mail",
        details: String(error) 
      },
      { status: 500 }
    );
  }
}
