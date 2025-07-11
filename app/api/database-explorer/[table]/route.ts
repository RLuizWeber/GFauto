import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { table: string } }
) {
  try {
    const tableName = params.table;
    
    // Verificar se a tabela existe
    const tableExists = await prisma.$queryRaw<Array<{table_name: string}>>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      AND table_name = ${tableName};
    `;

    if (tableExists.length === 0) {
      return new NextResponse(generateErrorHTML(`Tabela "${tableName}" não encontrada`), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // Obter estrutura da tabela
    const columns = await prisma.$queryRaw<Array<{
      column_name: string;
      data_type: string;
      is_nullable: string;
      column_default: string | null;
    }>>`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = ${tableName}
      ORDER BY ordinal_position;
    `;

    // Obter dados da tabela (limitado a 100 registros)
    let tableData: any[] = [];
    let totalCount = 0;
    
    try {
      const countResult = await prisma.$queryRawUnsafe(`SELECT COUNT(*) as count FROM "${tableName}"`);
      totalCount = Number((countResult as any)[0].count);
      
      if (totalCount > 0) {
        tableData = await prisma.$queryRawUnsafe(`SELECT * FROM "${tableName}" LIMIT 100`);
      }
    } catch (error) {
      console.error(`Erro ao buscar dados da tabela ${tableName}:`, error);
    }

    // Gerar HTML da página
    const html = generateTableHTML(tableName, columns, tableData, totalCount);

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });

  } catch (error) {
    console.error('Erro ao visualizar tabela:', error);
    
    return new NextResponse(
      generateErrorHTML(`Erro interno: ${error instanceof Error ? error.message : 'Erro desconhecido'}`),
      {
        status: 500,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      }
    );
  }
}

function generateErrorHTML(message: string): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Erro - Database Explorer</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 40px; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .error { 
          background: white; 
          border: 1px solid #fcc; 
          padding: 30px; 
          border-radius: 12px; 
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 500px;
        }
        .back-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 20px;
          text-decoration: none;
          display: inline-block;
        }
      </style>
    </head>
    <body>
      <div class="error">
        <h1>❌ Erro</h1>
        <p>${message}</p>
        <a href="/api/database-explorer" class="back-btn">← Voltar ao Explorer</a>
      </div>
    </body>
    </html>
  `;
}

function generateTableHTML(
  tableName: string, 
  columns: Array<{column_name: string; data_type: string; is_nullable: string; column_default: string | null}>,
  data: any[],
  totalCount: number
): string {
  
  const getDisplayName = (name: string) => {
    const names: Record<string, string> = {
      'Advertiser': '👤 Anunciantes',
      'Anuncio': '📢 Anúncios',
      'Payment': '💳 Pagamentos',
      'cidades': '🏙️ Cidades',
      'estados': '🗺️ Estados',
      'especialidades': '🎯 Especialidades',
      'especialidades_disponiveis': '📋 Especialidades Disponíveis',
      'imagens_anuncio': '🖼️ Imagens de Anúncios',
      'rotacao_premium': '⭐ Rotação Premium',
      '_prisma_migrations': '🔧 Migrações Prisma'
    };
    return names[name] || `📊 ${name}`;
  };

  // Gerar linhas da estrutura
  const structureRows = columns.map(col => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">
        ${col.column_name}
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">
          ${col.data_type}
        </span>
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">
        ${col.is_nullable === 'YES' ? 
          '<span style="color: #059669;">✅ SIM</span>' : 
          '<span style="color: #dc2626;">❌ NÃO</span>'
        }
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-size: 0.8rem; color: #6b7280;">
        ${col.column_default || '-'}
      </td>
    </tr>
  `).join('');

  // Gerar cabeçalho da tabela de dados
  const dataHeaders = columns.map(col => 
    `<th style="padding: 8px; background: #f8fafc; border-bottom: 1px solid #e5e7eb; font-size: 0.9rem;">${col.column_name}</th>`
  ).join('');

  // Gerar linhas da tabela de dados
  const dataRows = data.map(row => {
    const cells = columns.map(col => {
      const value = row[col.column_name];
      const displayValue = value === null ? 
        '<span style="color: #9ca3af; font-style: italic;">null</span>' :
        String(value).length > 50 ? 
          String(value).substring(0, 50) + '...' :
          String(value);
      
      return `<td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-size: 0.8rem;">${displayValue}</td>`;
    }).join('');
    
    return `<tr>${cells}</tr>`;
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${getDisplayName(tableName)} - Database Explorer</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .header {
          background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);
          color: white;
          padding: 30px;
        }
        
        .header h1 {
          font-size: 2rem;
          margin-bottom: 10px;
          font-weight: 700;
        }
        
        .header-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .back-btn {
          background: rgba(255,255,255,0.2);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s ease;
        }
        
        .back-btn:hover {
          background: rgba(255,255,255,0.3);
        }
        
        .stats {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-number {
          font-size: 1.5rem;
          font-weight: bold;
          display: block;
        }
        
        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        .content {
          padding: 30px;
        }
        
        .section {
          margin-bottom: 40px;
        }
        
        .section h2 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 10px;
        }
        
        .table-container {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-bottom: 20px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          min-width: 600px;
        }
        
        th {
          background: #f8fafc;
          padding: 12px 8px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
          font-size: 0.9rem;
        }
        
        .empty-state {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }
        
        .empty-state h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
        
        @media (max-width: 768px) {
          .header h1 {
            font-size: 1.5rem;
          }
          
          .header-info {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .stats {
            gap: 20px;
          }
          
          .content {
            padding: 20px;
          }
          
          table {
            min-width: 500px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="header-info">
            <div>
              <h1>${getDisplayName(tableName)}</h1>
              <p>Tabela: <code>${tableName}</code></p>
            </div>
            <div class="stats">
              <div class="stat">
                <span class="stat-number">${columns.length}</span>
                <span class="stat-label">Colunas</span>
              </div>
              <div class="stat">
                <span class="stat-number">${totalCount}</span>
                <span class="stat-label">Registros</span>
              </div>
            </div>
          </div>
          <div style="margin-top: 20px;">
            <a href="/api/database-explorer" class="back-btn">← Voltar ao Explorer</a>
          </div>
        </div>
        
        <div class="content">
          <!-- Estrutura da Tabela -->
          <div class="section">
            <h2>🔧 Estrutura da Tabela</h2>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nome da Coluna</th>
                    <th>Tipo de Dados</th>
                    <th>Permite NULL</th>
                    <th>Valor Padrão</th>
                  </tr>
                </thead>
                <tbody>
                  ${structureRows}
                </tbody>
              </table>
            </div>
          </div>
          
          <!-- Dados da Tabela -->
          <div class="section">
            <h2>📊 Dados da Tabela</h2>
            ${totalCount === 0 ? `
              <div class="empty-state">
                <h3>📭 Tabela Vazia</h3>
                <p>Esta tabela não possui registros no momento.</p>
              </div>
            ` : `
              <div class="table-container">
                <table>
                  <thead>
                    <tr>${dataHeaders}</tr>
                  </thead>
                  <tbody>
                    ${dataRows}
                  </tbody>
                </table>
              </div>
              ${data.length >= 100 ? `
                <p style="color: #6b7280; font-size: 0.9rem; text-align: center;">
                  📝 Mostrando primeiros 100 registros de ${totalCount} total
                </p>
              ` : ''}
            `}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

