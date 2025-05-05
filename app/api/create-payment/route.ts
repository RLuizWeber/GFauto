// Exemplo em /app/api/create-payment/route.ts
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';

// Inicializa o Mercado Pago com o token da variável de ambiente
// Certifique-se que MP_ACCESS_TOKEN está configurada na Vercel
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const preference = new Preference(client);

export async function POST(request: Request) {
  try {
    // Para teste, podemos pegar dados fixos ou do corpo da requisição
    // Exemplo de corpo: { "planId": "plano_teste_1", "title": "Plano Teste", "unit_price": 1.00 }
    const { planId, title, unit_price } = await request.json();
    const quantity = 1;

    // Validação básica
    if (!planId || !title || !unit_price) {
      return NextResponse.json({ error: 'Campos planId, title e unit_price são obrigatórios' }, { status: 400 });
    }

    // A URL base DEVE ser configurada na Vercel como NEXT_PUBLIC_BASE_URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Fallback para localhost

    console.log(`Criando preferência para: ${title} no valor de ${unit_price}`);
    console.log(`Base URL para retorno: ${baseUrl}`);

    const body = {
      items: [
        {
          id: planId,
          title: title,
          quantity: quantity,
          unit_price: unit_price,
          currency_id: 'BRL',
        }
      ],
      back_urls: {
        success: `${baseUrl}/pagamento/sucesso?plan=${planId}`, // Exemplo de URL de sucesso
        failure: `${baseUrl}/pagamento/falha`,
        pending: `${baseUrl}/pagamento/pendente`,
      },
      auto_return: 'approved', // Retorna automaticamente após aprovação
      // URL para receber notificações (webhooks) - Criaremos essa rota depois
      notification_url: `${baseUrl}/api/webhook/mercadopago`,
    };

    const result = await preference.create({ body });

    console.log("Preferência de pagamento criada:", result);
    // Retorna o ID da preferência e a URL de inicialização (init_point)
    return NextResponse.json({ preferenceId: result.id, init_point: result.init_point });

  } catch (e) {
    console.error("Erro ao criar preferência:", e);
    // Verifica se é um erro de JSON parsing
    if (e instanceof SyntaxError) {
        return NextResponse.json({ error: 'Erro ao processar JSON da requisição' }, { status: 400 });
    }
    // Tenta extrair mais detalhes do erro do Mercado Pago, se disponível
    const errorDetails = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: 'Erro ao criar preferência de pagamento', details: errorDetails }, { status: 500 });
  }
}

