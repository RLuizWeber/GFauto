/*
  Warnings:

  - Made the column `mercadopagoPreferenceId` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `status` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusPagamento" AS ENUM ('PENDING', 'APPROVED', 'AUTHORIZED', 'IN_PROCESS', 'IN_MEDIATION', 'REJECTED', 'CANCELLED', 'REFUNDED', 'CHARGED_BACK');

-- CreateEnum
CREATE TYPE "StatusAnuncio" AS ENUM ('AGUARDANDO_PAGAMENTO', 'AGUARDANDO_CADASTRO', 'PUBLICADO', 'PAGAMENTO_PROBLEMA', 'REEMBOLSADO_POS_PUBLICACAO', 'SUSPENSO_CHARGEBACK', 'SUSPENSO_ADMIN', 'EXPIRADO');

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "mercadopagoPreferenceId" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusPagamento" NOT NULL;

-- CreateTable
CREATE TABLE "Anuncio" (
    "id" TEXT NOT NULL,
    "advertiserId" TEXT NOT NULL,
    "mercadopagoPreferenceId" TEXT NOT NULL,
    "status" "StatusAnuncio" NOT NULL,
    "tituloPlano" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anuncio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Anuncio_mercadopagoPreferenceId_key" ON "Anuncio"("mercadopagoPreferenceId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_mercadopagoPreferenceId_fkey" FOREIGN KEY ("mercadopagoPreferenceId") REFERENCES "Anuncio"("mercadopagoPreferenceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anuncio" ADD CONSTRAINT "Anuncio_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
