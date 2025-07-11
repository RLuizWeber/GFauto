/*
  Warnings:

  - You are about to drop the column `name` on the `Advertiser` table. All the data in the column will be lost.
  - Added the required column `celContato` to the `Advertiser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Advertiser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeResponsavel` to the `Advertiser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planoEscolhido` to the `Advertiser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Advertiser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Advertiser" DROP COLUMN "name",
ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cargo" TEXT,
ADD COLUMN     "celContato" TEXT NOT NULL,
ADD COLUMN     "celContato2" TEXT,
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "cnpj" TEXT,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "emailVerificado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "enderecoEmpresa" TEXT,
ADD COLUMN     "especialidade" TEXT,
ADD COLUMN     "estado" TEXT,
ADD COLUMN     "imagemUrl" TEXT,
ADD COLUMN     "nomeFantasia" TEXT,
ADD COLUMN     "nomeParaAnuncio" TEXT,
ADD COLUMN     "nomeResponsavel" TEXT NOT NULL,
ADD COLUMN     "planoEscolhido" TEXT NOT NULL,
ADD COLUMN     "razaoSocial" TEXT,
ADD COLUMN     "senha" TEXT NOT NULL,
ADD COLUMN     "slogan" TEXT,
ADD COLUMN     "statusCadastro" TEXT NOT NULL DEFAULT 'cadastro_simples';
