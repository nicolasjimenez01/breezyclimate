'use client'
import { Pedido } from "@prisma/client"
import { create } from "zustand"
import { CreatePedido } from "@/interfaces/Obra"

interface PedidosStore {
  pedidos: Pedido[]
  getPedidos: () => Promise<void>
  createPedido: (pedido: CreatePedido) => Promise<Pedido>
  deletePedido: (id: number) => Promise<void>;
}


export const usePedidosStore = create<PedidosStore>((set) => ({
  pedidos: [],

  getPedidos: async () => {
    const res = await fetch('/api/pedidos')
    const pedidos = await res.json()
    set({ pedidos })
  },

  createPedido: async (pedido) => {
    const res = await fetch('/api/pedidos', {
      method: 'POST',
      body: JSON.stringify(pedido),
      headers: {
        'Content-type': 'application/json',
      }
    })
    const createdPedido = await res.json()
    set((state) => ({ pedidos: [...state.pedidos, createdPedido]}))
    return createdPedido
  },

  deletePedido: async (id) => {
    await fetch(`http://localhost:3000/api/pedidos/${id}`, {
      method: 'DELETE',
    });
    set((state) => ({ pedidos: state.pedidos.filter((pedido) => pedido.id !== id) }));
  }
}))