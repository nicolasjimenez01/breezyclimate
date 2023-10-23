-- CreateTable
CREATE TABLE "Insumo" (
    "id" SERIAL NOT NULL,
    "nomInsumo" TEXT NOT NULL,
    "proveedor" TEXT NOT NULL,
    "cantStock" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insumo_pkey" PRIMARY KEY ("id")
);
