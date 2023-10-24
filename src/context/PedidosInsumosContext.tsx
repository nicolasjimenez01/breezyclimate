import { create } from 'zustand'
import { PedidoInsumo } from '@prisma/client'
import { CreatePedidoInsumos } from '@/interfaces/Obra'

interface PedidosInsumosStore {
  pedidosInsumos: PedidoInsumo[]
  getPedidosInsumos: () => Promise<void>
  createPedidosInsumos: (pedidoInsumos: CreatePedidoInsumos[]) => Promise<void>
}

export const usePedidosInsumosStore = create<PedidosInsumosStore>((set) => ({
  pedidosInsumos: [],

  getPedidosInsumos: async () => {
    const res = await fetch('/api/pedidosInsumo')
    const pedidosInsumos = await res.json()
    set({ pedidosInsumos })
  },
  createPedidosInsumos: async (pedidoInsumos) => {
    const res = await fetch('/api/pedidosInsumo', {
      method: 'POST',
      body: JSON.stringify(pedidoInsumos),
      headers: {
        'Content-type': 'application/json',
      }
    })
    const createdPedidoInsumos = await res.json()
    set((state) => ({ pedidosInsumos: [...state.pedidosInsumos, createdPedidoInsumos]}))
  },
}))