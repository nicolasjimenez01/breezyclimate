'use client'
import CardWithLink from "@/components/cards";
import { useRouter } from "next/navigation";
import DialogWithForm from "@/components/popovers/PedidosPopover";
import Link from "next/link";


export default function RecLamina() {

  const router = useRouter()

  const customSvg = (
    <svg width="60" height="60" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.927 15.0401L18.4001 18.4001M9.4001 5.2001C11.3883 5.2001 13.0001 6.81187 13.0001 8.8001M17.2801 9.4401C17.2801 13.77 13.77 17.2801 9.4401 17.2801C5.11018 17.2801 1.6001 13.77 1.6001 9.4401C1.6001 5.11018 5.11018 1.6001 9.4401 1.6001C13.77 1.6001 17.2801 5.11018 17.2801 9.4401Z" stroke="black" stroke-width="2" stroke-linecap="round"/>
    </svg>
  );

  return (
    <div className="flex items-center justify-center h-screen mx-4">
      <Link href="/pedidos/reclamina/tabla">
        <CardWithLink title="Buscar" text="Aquí puedes buscar el listado de pedidos previamente realizados" svg={customSvg}/>
      </Link>
      
      <DialogWithForm/>
    </div>
  )
}