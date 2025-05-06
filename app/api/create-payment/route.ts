// Exemplo em /app/api/create-payment/route.ts
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';

// Inicializa o Mercado Pago com o token da variável de ambiente
// Certifique-se que MP_ACCESS_TOKEN está configurada na Vercel
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const preference = new Preference(client);

export async function POST(request: Request) {
  // Adicionando logs para depuração
  console.log("--- INÍCIO DA REQUISIÇÃO /api/create-payment ---");
  console.log("Valor de process.env.BASE_URL (não mais usado diretamente):", process.env.BASE_URL);
  console.log("Valor de process.env.VERCEL_URL:", process.env.VERCEL_URL);
  console.log("Valor de process.env.NEXT_PUBLIC_VERCEL_URL:", process.env.NEXT_PUBLIC_VERCEL_URL);
  console.log("Valor de process.env.MP_ACCESS_TOKEN (apenas para verificar se existe):", process.env.MP_ACCESS_TOKEN ? "Definido" : "NÃO DEFINIDO");
  console.log("--- FIM DOS LOGS DE VARIÁVEIS DE AMBIENTE INICIAIS ---");

  try {
    const { planId, title, unit_price } = await request.json();
    const quantity = 1;

    if (!planId || !title || !unit_price) {
      return NextResponse.json({ error: 'Campos planId, title e unit_price são obrigatórios' }, { status: 400 });
    }

    // A URL base será construída a partir de process.env.VERCEL_URL
    const vercelUrl = process.env.VERCEL_URL;
    const baseUrl = vercelUrl ? `https://${vercelUrl}` : undefined; // Adiciona https:// e mantém undefined se VERCEL_URL não existir

    // Logs para depurar a construção da baseUrl
    console.log("Tentando construir baseUrl a partir de VERCEL_URL:") ;
    console.log("  process.env.VERCEL_URL (usado para construir baseUrl):", vercelUrl);
    console.log("  baseUrl construída (com https://) :", baseUrl);

    if (!baseUrl) {
      console.error("Não foi possível construir baseUrl a partir de process.env.VERCEL_URL! (Verificação no código)");
      // Log adicional para entender o contexto
      console.log("Contexto do erro baseUrl ausente (após tentar usar VERCEL_URL):");
      console.log("  process.env.VERCEL_URL (dentro do if !baseUrl):", process.env.VERCEL_URL); // Já logado acima, mas repetindo para contexto do erro
      return NextResponse.json({ error: 'Configuração do servidor incompleta: Não foi possível determinar a URL base.' }, { status: 500 });
    }

    console.log(`Criando preferência para: ${title} no valor de ${unit_price}`);
    console.log(`Base URL para retorno (construída a partir de VERCEL_URL): ${baseUrl}`);

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
        success: `${baseUrl}/pagamento/sucesso?plan=${planId}`,
        failure: `${baseUrl}/pagamento/falha`,
        pending: `${baseUrl}/pagamento/pendente`,
      },
      auto_return: 'approved',
      notification_url: `${baseUrl}/api/webhook/mercadopago`,
    };

    const result = await preference.create({ body });

    console.log("Preferência de pagamento criada:", result);
    return NextResponse.json({ preferenceId: result.id, init_point: result.init_point });

  } catch (e) {
    console.error("Erro ao criar preferência:", e);
    if (e instanceof SyntaxError && e.message.includes("JSON")) {
        return NextResponse.json({ error: 'Erro ao processar JSON da requisição' }, { status: 400 });
    }
    const errorDetails = JSON.stringify(e, Object.getOwnPropertyNames(e));
    return NextResponse.json({ error: 'Erro ao criar preferência de pagamento', details: errorDetails }, { status: 500 });
  }
}
