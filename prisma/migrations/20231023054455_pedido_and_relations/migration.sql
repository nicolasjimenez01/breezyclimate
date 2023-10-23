-- AlterTable
ALTER TABLE "Insumo" ALTER COLUMN "precio" SET DATA TYPE DOUBLE PRECISION;

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
CREATE TABLE "PedidoInsumo" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "insumoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PedidoInsumo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoInsumo" ADD CONSTRAINT "PedidoInsumo_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoInsumo" ADD CONSTRAINT "PedidoInsumo_insumoId_fkey" FOREIGN KEY ("insumoId") REFERENCES "Insumo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
