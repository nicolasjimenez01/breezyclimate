-- CreateTable
CREATE TABLE "Obra" (
    "id" SERIAL NOT NULL,
    "nomObra" TEXT NOT NULL,
    "nomOficial" TEXT NOT NULL,
    "celOficial" TEXT NOT NULL,
    "contactoObra" TEXT NOT NULL,
    "celContacto" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Obra_pkey" PRIMARY KEY ("id")
);
