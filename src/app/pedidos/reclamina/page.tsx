'use client'
import CardWithLink from "@/components/cards";
import { useRouter } from "next/navigation";
import DialogWithForm from "@/components/popovers/PedidosPopover";


export default function RecLamina() {

  const router = useRouter()

  return (
    <div className="flex items-center justify-center h-screen mx-4">
      <CardWithLink title="Buscar" text="Aquí puedes buscar el listado de pedidos previamente realizados" accion="Buscar pedido" onClick={() => router.push('/pedidos/reclamina/tabla')}/>
      <DialogWithForm/>
    </div>
  )
}