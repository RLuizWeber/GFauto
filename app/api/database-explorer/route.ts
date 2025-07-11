import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Obter lista de todas as tabelas
    const tables = await prisma.$queryRaw<Array<{table_name: string}>>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;

    // Para cada tabela, obter contagem de registros
    const tablesWithCounts = await Promise.all(
      tables.map(async (table) => {
        try {
          const countResult = await prisma.$queryRawUnsafe(`SELECT COUNT(*) as count FROM "${table.table_name}"`);
          const count = Number((countResult as any)[0].count);
          
          return {
            name: table.table_name,
            count: count,
            displayName: getDisplayName(table.table_name)
          };
        } catch (error) {
          return {
            name: table.table_name,
            count: 0,
            displayName: getDisplayName(table.table_name),
            error: 'Erro ao contar registros'
          };
        }
      })
    );

    // Gerar HTML da página
    const html = generateDatabaseExplorerHTML(tablesWithCounts);

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });

  } catch (error) {
    console.error('Erro no Database Explorer:', error);
    
    const errorHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erro - Database Explorer</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
          .error { background: #fee; border: 1px solid #fcc; padding: 20px; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="error">
          <h1>❌ Erro no Database Explorer</h1>
          <p><strong>Erro:</strong> ${error instanceof Error ? error.message : 'Erro desconhecido'}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>
      </body>
      </html>
    `;

    return new NextResponse(errorHtml, {
      status: 500,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  }
}

function getDisplayName(tableName: string): string {
  const displayNames: Record<string, string> = {
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
  
  return displayNames[tableName] || `📊 ${tableName}`;
}

function generateDatabaseExplorerHTML(tables: Array<{name: string, count: number, displayName: string, error?: string}>): string {
  const tableRows = tables.map(table => `
    <tr onclick="window.location.href='/api/database-explorer/${table.name}'" style="cursor: pointer;">
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <strong>${table.displayName}</strong>
        <br>
        <small style="color: #6b7280;">${table.name}</small>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
        ${table.error ? 
          `<span style="color: #ef4444;">❌ ${table.error}</span>` : 
          `<span style="color: ${table.count > 0 ? '#059669' : '#6b7280'}; font-weight: bold;">${table.count}</span>`
        }
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
        <span style="color: #3b82f6;">👁️ Ver</span>
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Database Explorer - GFauto</title>
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
          max-width: 1200px;
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
          text-align: center;
        }
        
        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          font-weight: 700;
        }
        
        .header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        .stats {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-number {
          font-size: 2rem;
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
        
        .table-container {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }
        
        th {
          background: #f8fafc;
          padding: 16px 12px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
        }
        
        tr:hover {
          background: #f8fafc;
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }
        
        .footer {
          background: #f8fafc;
          padding: 20px 30px;
          text-align: center;
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
        }
        
        .refresh-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          margin-top: 10px;
          transition: background 0.2s ease;
        }
        
        .refresh-btn:hover {
          background: #2563eb;
        }
        
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2rem;
          }
          
          .stats {
            gap: 20px;
          }
          
          .content {
            padding: 20px;
          }
          
          th, td {
            padding: 8px !important;
            font-size: 0.9rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🗄️ Database Explorer</h1>
          <p>Visualização completa do banco de dados GFauto</p>
          <div class="stats">
            <div class="stat">
              <span class="stat-number">${tables.length}</span>
              <span class="stat-label">Tabelas</span>
            </div>
            <div class="stat">
              <span class="stat-number">${tables.reduce((sum, t) => sum + t.count, 0)}</span>
              <span class="stat-label">Registros Total</span>
            </div>
            <div class="stat">
              <span class="stat-number">${tables.filter(t => t.count > 0).length}</span>
              <span class="stat-label">Com Dados</span>
            </div>
          </div>
        </div>
        
        <div class="content">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>📋 Tabela</th>
                  <th style="text-align: center;">📊 Registros</th>
                  <th style="text-align: center;">🔍 Ação</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="footer">
          <p>📅 Atualizado em: ${new Date().toLocaleString('pt-BR')}</p>
          <button class="refresh-btn" onclick="window.location.reload()">🔄 Atualizar</button>
        </div>
      </div>
    </body>
    </html>
  `;
}

