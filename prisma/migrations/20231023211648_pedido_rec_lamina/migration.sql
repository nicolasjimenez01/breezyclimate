/*
  Warnings:

  - You are about to drop the `Pedido` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_obraId_fkey";

-- DropForeignKey
ALTER TABLE "PedidoInsumo" DROP CONSTRAINT "PedidoInsumo_pedidoId_fkey";

-- DropTable
DROP TABLE "Pedido";

-- CreateTable
CREATE TABLE "PedidoRecLamina" (
    "id" SERIAL NOT NULL,
    "medidaMayorA" DOUBLE PRECISION NOT NULL,
    "medidaMenorA" DOUBLE PRECISION NOT NULL,
    "medidaMayorB" DOUBLE PRECISION NOT NULL,
    "medidaMenorB" DOUBLE PRECISION NOT NULL,
    "promMedA" DOUBLE PRECISION NOT NULL,
    "promMedB" DOUBLE PRECISION NOT NULL,
    "longitudDuctos" DOUBLE PRECISION NOT NULL,
    "cantPiezas" INTEGER NOT NULL,
    "distSoportes" DOUBLE PRECISION NOT NULL,
    "longSoportes" DOUBLE PRECISION NOT NULL,
    "cantSoportes" INTEGER NOT NULL,
    "perimetro" DOUBLE PRECISION NOT NULL,
    "areaM2" DOUBLE PRECISION NOT NULL,
    "rejillasDifusores" INTEGER NOT NULL,
    "tieRoad" DOUBLE PRECISION NOT NULL,
    "ciudad" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "obraId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PedidoRecLamina_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PedidoRecLamina" ADD CONSTRAINT "PedidoRecLamina_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoInsumo" ADD CONSTRAINT "PedidoInsumo_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "PedidoRecLamina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
