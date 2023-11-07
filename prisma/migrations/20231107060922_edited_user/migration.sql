/*
  Warnings:

  - You are about to drop the column `rol` on the `User` table. All the data in the column will be lost.
  - Added the required column `celular` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edad` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "rol",
ADD COLUMN     "celular" INTEGER NOT NULL,
ADD COLUMN     "edad" INTEGER NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Role";
