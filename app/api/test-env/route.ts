import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Retorna todas as variáveis de ambiente como JSON
    // ATENÇÃO: Isso é apenas para diagnóstico. Em produção, nunca exponha todas as suas variáveis de ambiente.
    // Certifique-se de remover ou proteger esta rota após o teste.
    const envVars = { ...process.env };
    return NextResponse.json(envVars, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar variáveis de ambiente:", error);
    return NextResponse.json(
      { error: "Erro ao buscar variáveis de ambiente" },
      { status: 500 }
    );
  }
}