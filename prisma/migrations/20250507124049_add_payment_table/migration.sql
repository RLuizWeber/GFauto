-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "advertiserId" TEXT NOT NULL,
    "mercadopagoPreferenceId" TEXT,
    "mercadopagoPaymentId" TEXT,
    "status" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "planId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_mercadopagoPreferenceId_key" ON "Payment"("mercadopagoPreferenceId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_mercadopagoPaymentId_key" ON "Payment"("mercadopagoPaymentId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
