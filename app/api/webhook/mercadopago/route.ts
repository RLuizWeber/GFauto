import { NextResponse } from 'next/server';

// Esta é a sua chave secreta para validar webhooks do Mercado Pago.
// É ALTAMENTE RECOMENDADO que você a defina como uma variável de ambiente.
// Por agora, para teste inicial, podemos deixar um placeholder, mas LEMBRE-SE de configurar isso corretamente depois.
const MERCADOPAGO_WEBHOOK_SECRET = process.env.MERCADOPAGO_WEBHOOK_SECRET || "YOUR_MERCADOPAGO_WEBHOOK_SECRET";

export async function POST(request: Request) {
  console.log("--- INÍCIO DA REQUISIÇÃO WEBHOOK MERCADO PAGO ---");

  try {
    const body = await request.json(); // Tenta parsear o corpo como JSON
    console.log("Corpo da requisição (payload) do webhook:", JSON.stringify(body, null, 2));

    // TODO: Implementar a validação da assinatura do webhook (MUITO IMPORTANTE para segurança)
    // Por exemplo, usando o header 'x-signature' e a chave secreta.
    // const signature = request.headers.get('x-signature');
    // const requestId = request.headers.get('x-request-id');
    // console.log("Headers relevantes: x-signature:", signature, "x-request-id:", requestId);

    // TODO: Processar o tipo de evento (ex: payment.updated, payment.created)
    // if (body.type === 'payment' && body.action === 'payment.updated') {
    //   const paymentId = body.data.id;
    //   console.log("Evento de pagamento recebido para o ID:", paymentId);
    //   // Aqui você buscaria os detalhes do pagamento no Mercado Pago usando o paymentId
    //   // e atualizaria seu banco de dados.
    // }

    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Processada com sucesso inicial) ---");
    // Responda ao Mercado Pago com um status 200 OK para confirmar o recebimento.
    return NextResponse.json({ received: true, message: "Webhook recebido com sucesso." }, { status: 200 });

  } catch (error: any) {
    console.error("Erro ao processar webhook do Mercado Pago:", error);
    // Se houver um erro no parsing do JSON ou outro erro, registre e retorne um erro.
    // É importante retornar um status de erro para que o Mercado Pago saiba que algo falhou.
    let errorMessage = "Erro desconhecido ao processar webhook.";
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
        errorMessage = "Erro: Corpo da requisição não é um JSON válido.";
        console.error("Detalhe do erro de JSON:", error.message);
        // Não podemos acessar request.text() diretamente aqui após request.json() ter sido chamado e falhado.
        // Para depuração, seria necessário ler o corpo como texto ANTES de tentar o JSON.
    }
    console.log("--- FIM DA REQUISIÇÃO WEBHOOK MERCADO PAGO (Erro) ---");
    return NextResponse.json({ received: false, error: errorMessage, details: error.message }, { status: 400 });
  }
}
