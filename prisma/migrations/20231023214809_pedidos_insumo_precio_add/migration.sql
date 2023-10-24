/*
  Warnings:

  - Added the required column `precio` to the `PedidoInsumo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PedidoInsumo" ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL;
