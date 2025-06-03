/*
  Warnings:

  - You are about to alter the column `titulo` on the `Anuncio` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to drop the `Imagem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cidade_id` to the `Anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `especialidade_id` to the `Anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Anuncio` table without a default value. This is not possible if the table is not empty.
  - Made the column `titulo` on table `Anuncio` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Imagem" DROP CONSTRAINT "Imagem_anuncioId_fkey";

-- AlterTable
ALTER TABLE "Anuncio" ADD COLUMN     "cidade_id" TEXT NOT NULL,
ADD COLUMN     "data_expiracao" TIMESTAMP(3),
ADD COLUMN     "email" VARCHAR(100),
ADD COLUMN     "endereco" TEXT NOT NULL,
ADD COLUMN     "especialidade_id" TEXT NOT NULL,
ADD COLUMN     "imagem_principal" VARCHAR(255),
ADD COLUMN     "latitude" DECIMAL(10,8),
ADD COLUMN     "longitude" DECIMAL(11,8),
ADD COLUMN     "plano" VARCHAR(20) NOT NULL DEFAULT 'cortesia',
ADD COLUMN     "site" VARCHAR(200),
ADD COLUMN     "telefone" VARCHAR(20) NOT NULL,
ADD COLUMN     "whatsapp" VARCHAR(20),
ALTER COLUMN "titulo" SET NOT NULL,
ALTER COLUMN "titulo" SET DATA TYPE VARCHAR(200);

-- DropTable
DROP TABLE "Imagem";

-- CreateTable
CREATE TABLE "estados" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "sigla" CHAR(2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cidades" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "estado_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "especialidades" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "slug" VARCHAR(100) NOT NULL,
    "icone" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "especialidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rotacao_premium" (
    "id" TEXT NOT NULL,
    "especialidade_id" TEXT NOT NULL,
    "cidade_id" TEXT NOT NULL,
    "ultima_posicao" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rotacao_premium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "especialidades_disponiveis" (
    "id" TEXT NOT NULL,
    "cidade_id" TEXT NOT NULL,
    "especialidade_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "especialidades_disponiveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagens_anuncio" (
    "id" TEXT NOT NULL,
    "anuncio_id" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "imagens_anuncio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_cidades_estado" ON "cidades"("estado_id");

-- CreateIndex
CREATE UNIQUE INDEX "rotacao_premium_especialidade_id_cidade_id_key" ON "rotacao_premium"("especialidade_id", "cidade_id");

-- CreateIndex
CREATE INDEX "idx_especialidades_disponiveis_cidade" ON "especialidades_disponiveis"("cidade_id");

-- CreateIndex
CREATE UNIQUE INDEX "especialidades_disponiveis_cidade_id_especialidade_id_key" ON "especialidades_disponiveis"("cidade_id", "especialidade_id");

-- CreateIndex
CREATE INDEX "idx_anuncios_cidade_especialidade" ON "Anuncio"("cidade_id", "especialidade_id");

-- CreateIndex
CREATE INDEX "idx_anuncios_plano" ON "Anuncio"("plano");

-- CreateIndex
CREATE INDEX "idx_anuncios_status" ON "Anuncio"("status");

-- AddForeignKey
ALTER TABLE "cidades" ADD CONSTRAINT "cidades_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "estados"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rotacao_premium" ADD CONSTRAINT "rotacao_premium_especialidade_id_fkey" FOREIGN KEY ("especialidade_id") REFERENCES "especialidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rotacao_premium" ADD CONSTRAINT "rotacao_premium_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "cidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "especialidades_disponiveis" ADD CONSTRAINT "especialidades_disponiveis_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "cidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "especialidades_disponiveis" ADD CONSTRAINT "especialidades_disponiveis_especialidade_id_fkey" FOREIGN KEY ("especialidade_id") REFERENCES "especialidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anuncio" ADD CONSTRAINT "Anuncio_especialidade_id_fkey" FOREIGN KEY ("especialidade_id") REFERENCES "especialidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anuncio" ADD CONSTRAINT "Anuncio_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagens_anuncio" ADD CONSTRAINT "imagens_anuncio_anuncio_id_fkey" FOREIGN KEY ("anuncio_id") REFERENCES "Anuncio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
