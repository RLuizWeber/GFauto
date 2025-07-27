Fluxo Completo do Anunciante – Projeto GFauto 22/07/25 GPT

Este podemos chamar de: "O Coração do GFauto por ser o ponto central."

**Fluxo do Anunciante** // Ver
Planos → Cadastro Simples (+ plano) → Criar Senha → Validar E-mail → Conclusão Cadastro → Anúncio em Tempo Real → Publicar

1 - Orígem: https://gfauto.vercel.app/   (após clicar em "Anuncie sua Empresa" vai para a página "planos" https://gfauto.vercel.app/planos qualquer dos planos, escolhidos (clicados) nessa página, cortesia ou premium 1 ano, 2 anos ou 3 anos vai para o "cadastro simples" levando a informação do plano e valor clicado. A informação (que ele escolheu) do plano e valor será levada junto e estará preenchida no início do cadastro simples, para saber o plano e quanto vai pagar e segue o fluxo.)

**Cortesia** → *cadastro simples* (nome do responsável, cpf, principal e-mail e telefone) e login → recebe e-mail com link de confirmação → vai para "conclusão do cadastro" → e depois

"conclusão do cadastro" Razão Social, Nome de Fantasia, CNPJ, nome do responsável (já vem preenchido do cadastro simples), cpf (também já vem preenchido) Celular de Contato (também já vem preenchido), Endereço da Empresa, Bairro, CEP, Cidade, Estado, Seu Cargo), inserir imagem), e outros.  → *criação e ativação (botão "Publicar") do anúncio* (deve ser na mesma página *conclusão do cadastro* pois o anúncio vai sendo preenchido conforme o anunciante informa os dados da *conclusão do cadastro* (para o Cortesia os campos habilitados que formarão o anúncio serão apenas Razão Social ou Nome de Fantasia (ele vai marcar (x) para definir qual vai para o anúncio), Especialidade, e o endereço completo.

**Premium** → *cadastro simples* (nome do responsável, cpf, principal e-mail e Celular de Contato) e login → recebe e-mail com link de confirmação → pagtos (com a informação do valor do Plano vai para o pagamento → e depois...

*conclusão do cadastro* (Razão Social, Nome de Fantasia, CNPJ (ele vai marcar, (x) para definir qual vai para o anúncio), nome do responsável (já vem preenchido do cadastro simples), cpf (também já vem preenchido) Celular de Contato (também já vem preenchido), Endereço da Empresa, Bairro, CEP, Cidade, Estado, Seu Cargo), inserir imagem), e outros (Especialidade, Slogan, descrição, opção para o 2º celular).  → *criação e ativação (botão "Publicar") do anúncio* (deve ser na mesma página *conclusão do cadastro* pois o anúncio vai sendo preenchido conforme o anunciante informa os dados da *conclusão do cadastro*

    Aceite dos termos (se houver)


2. Conclusão do Cadastro (Auxiliar)
Objetivo:

Permitir que o anunciante complete o cadastro e monte o anúncio visualmente.
Campos da Tabela Advertiser envolvidos:
Campo	Descrição
id	ID do anunciante (gerado automaticamente)
email	E-mail usado no cadastro simples
senha	Senha já cadastrada
cpf	CPF do responsável (inserido agora)
cnpj	CNPJ da empresa (inserido agora)
nomeFantasia	Nome da empresa (já preenchido)
nomeParaAnuncio	Nome que aparecerá no anúncio
slogan	Slogan de destaque
descricao	Descrição dos serviços
especialidade	Especialidade da empresa
estado	Estado (UF)
cidade	Cidade
enderecoEmpresa	Endereço completo
celContato	Celular principal
celContato2	Celular secundário
emailVerificado	Mantém true após confirmação de e-mail
imagemUrl	Upload da imagem do anúncio
planoEscolhido	Cortesia ou Premium
statusCadastro	"Completo", "Pendente", "Iniciado"
3. Visualização em Tempo Real

Enquanto preenche o formulário, o anunciante vê um preview do anúncio com:

    Nome da empresa (fantasia ou razão social, conforme ele (x) marcou.

    Slogan

    Descrição

    Contatos

    Endereço

    Imagem (Premium) se ele não enviar a imagem receberá um e-mail informando que pode fazê-lo. Ou aparece no campo "Insira uma imagem aqui"

O preview é exibido em tempo real, como ficará na página de resultados.
4. Publicação do Anúncio

Após completar o formulário:

    Verifica-se o status de pagamento:

        Cortesia: libera automaticamente a publicação.

        Premium: verifica se o pagamento foi aprovado (Mercado Pago / Webhook).

    O sistema gera a URL da página de resultados para o anunciante conferir.

5. Status no Banco de Dados
Campo	Significado
statusCadastro	Iniciado / Completo / Pendente
statusPagamento	Em dia / Não aprovado / Aguardando
statusAnuncio	Ativo / Inativo / Em Análise
6. E-mails Automáticos

    Após Cadastro Simples: Confirmação do e-mail

    Após Conclusão do Cadastro: E-mail de sucesso + link para ver o anúncio

    Se pagamento falhar: E-mail informando o problema e solicitando ação

7. Segurança

    Senha com hash (bcrypt ou equivalente)

    Validação de e-mail e CPF únicos

    Verificação de pagamento antes da publicação

8. Observações Finais

9. ### **Usuários Existentes (Login):**
```
/login → Dashboard Pessoal → Opções:
├── Upgrade para Premium
├── Criar Novo Anúncio
├── Gerenciar Anúncios Existentes
├── Atualizar Dados Cadastrais
├── Renovar Plano
├── Alterar Senha
├── Alterar e-mail

Campos de status: Plano atual: Premium 1 ano, válido até: 17.05.2026



```
	Esse fluxo elimina retrabalho futuro e já deixa a base pronta para integração total com painel, API e frontend.

    Quando o anunciante volta no sistema, ele pode editar os dados a qualquer momento via PUT /api/advertiser/[id]  (ele vai entrar na página de login e encontrar a opção "atualizar dados" entre as outras que disponibilizaremos, alterar senha, alterar e-mail, acrescentar um e-mail, etc.)

