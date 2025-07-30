// Exemplo em /app/api/send-email/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Inicializa o Resend com a chave da variável de ambiente
// Certifique-se que RESEND_API_KEY está configurada na Vercel
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Para teste, podemos pegar os dados do corpo da requisição
    // Exemplo de corpo: { "to": "destinatario@exemplo.com", "subject": "Teste Resend", "htmlContent": "<h1>Olá!</h1><p>Este é um e-mail de teste.</p>" }
    const { to, subject, htmlContent } = await request.json();

    // Validação básica
    if (!to || !subject || !htmlContent) {
      return NextResponse.json({ error: 'Campos to, subject e htmlContent são obrigatórios' }, { status: 400 });
    }

    // O domínio do remetente DEVE estar verificado no Resend
    const fromAddress = 'GFauto <nao-responda@gfauto.com.br>';

    console.log(`Tentando enviar e-mail para: ${to} de: ${fromAddress}`);

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [to],
      subject: subject,
      html: htmlContent, // Conteúdo HTML do e-mail
    });

    if (error) {
      console.error("Erro ao enviar e-mail:", error);
      // Retorna o erro do Resend para depuração
      return NextResponse.json({ error: 'Erro ao enviar e-mail', details: error }, { status: 500 });
    }

    console.log("E-mail enviado com sucesso:", data);
    return NextResponse.json({ message: 'E-mail enviado com sucesso!', data });

  } catch (e) {
    console.error("Erro inesperado:", e);
    // Verifica se é um erro de JSON parsing
    if (e instanceof SyntaxError) {
        return NextResponse.json({ error: 'Erro ao processar JSON da requisição' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro inesperado no servidor' }, { status: 500 });
  }
}