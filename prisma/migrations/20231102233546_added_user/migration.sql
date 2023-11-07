/*
  Warnings:

  - You are about to drop the `PedidoRecLamina` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMINISTRADOR', 'ALMACENISTA', 'OFICIAL');

-- DropForeignKey
ALTER TABLE "PedidoInsumo" DROP CONSTRAINT "PedidoInsumo_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "PedidoRecLamina" DROP CONSTRAINT "PedidoRecLamina_obraId_fkey";

-- DropTable
DROP TABLE "PedidoRecLamina";

-- CreateTable
CREATE TABLE "Pedido" (
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

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'OFICIAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoInsumo" ADD CONSTRAINT "PedidoInsumo_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
