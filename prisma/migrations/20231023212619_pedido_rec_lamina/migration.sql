-- DropForeignKey
ALTER TABLE "PedidoRecLamina" DROP CONSTRAINT "PedidoRecLamina_obraId_fkey";

-- AddForeignKey
ALTER TABLE "PedidoRecLamina" ADD CONSTRAINT "PedidoRecLamina_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra"("id") ON DELETE CASCADE ON UPDATE CASCADE;
