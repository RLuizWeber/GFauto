# Como excluir cadastros de anunciantes

## Opção 1: Via Interface de Administração (Recomendado)
Acesse: https://gfauto.vercel.app/admin/advertisers
- Lista todos os anunciantes
- Permite excluir com confirmação
- Interface visual e segura

## Opção 2: Via Prisma Studio (Desenvolvimento)
```bash
# No terminal local
npx prisma studio
```
- Abre interface gráfica do banco
- Navegar até tabela "Advertiser"
- Selecionar registro e excluir

## Opção 3: Via Terminal (Cuidado!)
```bash
# Conectar ao banco e executar SQL
# CUIDADO: Esta operação é irreversível!

# Excluir por ID específico:
DELETE FROM "Advertiser" WHERE id = 'ID_DO_ANUNCIANTE';

# Excluir por CPF:
DELETE FROM "Advertiser" WHERE cpf = 'CPF_SEM_FORMATACAO';

# Excluir todos os cadastros simples não confirmados:
DELETE FROM "Advertiser" 
WHERE "statusCadastro" = 'cadastro_simples' 
AND "emailVerificado" = false;
```

## Análise dos seus cadastros atuais:

### ✅ Cadastros Válidos:
- `adv_1754428458096_b1dneg8pshg` (Maria Oliveira) - Email confirmado
- `96a06db9-26c4-415b-b573-cb047b319d61` (João Silva) - Cadastro completo

### ⚠️ Cadastros Pendentes (podem ser excluídos):
- `adv_1754337665167_mqxb351heoj` (Luana Q. Weber) - Email não confirmado
- `adv_1754419821682_bg18k2fgg5` (Jucelia Ines Weber) - Email não confirmado  
- `adv_1754421583845_er1811wnl2` (Cristina Weber) - Email não confirmado
- `adv_1754422921322_jz6fyuw5a3m` (Salet Oliveira) - Email não confirmado
- `adv_1754425267268_uy9pxks5rno` (Iuri Petrolli) - Email não confirmado

## Recomendação:
Use a interface de administração em /admin/advertisers para maior segurança.
