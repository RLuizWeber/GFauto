-- Script para popular o banco de dados com fornecedores de auto elétricas em Passo Fundo
-- Este script deve ser executado no ambiente de desenvolvimento

-- Verificar se já existe a cidade de Passo Fundo
INSERT INTO Estado (id, nome, sigla)
SELECT 'rs', 'Rio Grande do Sul', 'RS'
WHERE NOT EXISTS (SELECT 1 FROM Estado WHERE sigla = 'RS');

-- Inserir a cidade de Passo Fundo se não existir
INSERT INTO Cidade (id, nome, estado_id)
SELECT 'passo_fundo', 'Passo Fundo', 'rs'
WHERE NOT EXISTS (SELECT 1 FROM Cidade WHERE nome = 'Passo Fundo' AND estado_id = 'rs');

-- Inserir a especialidade "Auto Elétricas" se não existir
INSERT INTO Especialidade (id, nome)
SELECT 'auto_eletricas', 'Auto Elétricas'
WHERE NOT EXISTS (SELECT 1 FROM Especialidade WHERE nome = 'Auto Elétricas');

-- Inserir fornecedores de auto elétricas em Passo Fundo (categoria premium)
INSERT INTO Fornecedor (id, nome, descricao, endereco, telefone, email, website, tipo, cidade_id)
VALUES 
('auto_eletrica_premium_1', 'Auto Elétrica Voltagem Premium', 'Especialistas em sistemas elétricos automotivos com mais de 20 anos de experiência. Atendimento personalizado e garantia em todos os serviços.', 'Av. Brasil, 1500 - Centro, Passo Fundo - RS', '(54) 3311-1234', 'contato@voltagempremium.com.br', 'www.voltagempremium.com.br', 'premium', 'passo_fundo'),
('auto_eletrica_premium_2', 'Eletro Car Service', 'Serviços completos de auto elétrica com equipamentos de última geração. Técnicos certificados e peças originais.', 'Rua Morom, 2340 - Centro, Passo Fundo - RS', '(54) 3313-5678', 'atendimento@eletrocarservice.com.br', 'www.eletrocarservice.com.br', 'premium', 'passo_fundo'),
('auto_eletrica_premium_3', 'Master Auto Elétrica', 'Soluções completas em auto elétrica para veículos nacionais e importados. Diagnóstico computadorizado e serviço expresso.', 'Av. Presidente Vargas, 980 - São Cristóvão, Passo Fundo - RS', '(54) 3314-9012', 'master@masterautoeletrica.com.br', 'www.masterautoeletrica.com.br', 'premium', 'passo_fundo');

-- Inserir fornecedores de auto elétricas em Passo Fundo (categoria cortesia)
INSERT INTO Fornecedor (id, nome, descricao, endereco, telefone, email, website, tipo, cidade_id)
VALUES 
('auto_eletrica_cortesia_1', 'Auto Elétrica do Paulo', 'Serviços de auto elétrica para todos os tipos de veículos. Atendimento rápido e preços acessíveis.', 'Rua Independência, 450 - Vila Rodrigues, Passo Fundo - RS', '(54) 3316-7890', 'paulo@autoeletricadopaulo.com.br', '', 'cortesia', 'passo_fundo'),
('auto_eletrica_cortesia_2', 'Elétrica Automotiva Luz', 'Reparos elétricos, instalação de acessórios e manutenção preventiva. Orçamento sem compromisso.', 'Rua Teixeira Soares, 789 - Boqueirão, Passo Fundo - RS', '(54) 3317-3456', 'contato@eletricaautomotivaluz.com.br', '', 'cortesia', 'passo_fundo'),
('auto_eletrica_cortesia_3', 'Auto Elétrica Confiança', 'Serviços de auto elétrica com qualidade e honestidade. Atendemos chamados de emergência.', 'Av. Rio Grande do Sul, 1234 - Petrópolis, Passo Fundo - RS', '(54) 3318-6789', 'autoeletricaconfianca@gmail.com', '', 'cortesia', 'passo_fundo'),
('auto_eletrica_cortesia_4', 'Elétrica Veicular Rápida', 'Serviços de auto elétrica com agilidade e bom preço. Especialistas em alternadores e motores de partida.', 'Rua Paissandu, 567 - Centro, Passo Fundo - RS', '(54) 3319-0123', 'rapida@eletricaveicular.com.br', '', 'cortesia', 'passo_fundo');

-- Relacionar fornecedores com a especialidade "Auto Elétricas"
INSERT INTO FornecedorEspecialidade (fornecedor_id, especialidade_id)
VALUES 
('auto_eletrica_premium_1', 'auto_eletricas'),
('auto_eletrica_premium_2', 'auto_eletricas'),
('auto_eletrica_premium_3', 'auto_eletricas'),
('auto_eletrica_cortesia_1', 'auto_eletricas'),
('auto_eletrica_cortesia_2', 'auto_eletricas'),
('auto_eletrica_cortesia_3', 'auto_eletricas'),
('auto_eletrica_cortesia_4', 'auto_eletricas');
