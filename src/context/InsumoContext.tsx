'use client'
import { Insumo } from "@prisma/client"
import { create } from "zustand"
import { UpdateInsumo } from "@/interfaces/Obra"

interface PedidoInsumo {
  cantidad: number,
  precio: number,
  total: number
  insumoId: number
}

interface InsumosStore {
  insumos: Insumo[];
  selectedInsumo: Insumo | null;
  getInsumos: () => Promise<void>;
  updateInsumo: (id: number, insumo: UpdateInsumo) => Promise<void>;
  setSelectedInsumo: (insumo: Insumo | null) => void;
  findInsumo: (id: number) => Promise<Insumo>;
  selectedInsumos: Insumo[] 
  setSelectedInsumos: (insumo: Insumo ) => void
  selectedPedidoInsumos: PedidoInsumo[]
  setSelectedPedidoInsumo: (pedidoInsumo: PedidoInsumo) => void
}

export const useInsumosStore = create<InsumosStore>((set) => ({
  insumos: [],
  selectedInsumo: null,
  selectedInsumos: [],
  selectedPedidoInsumos: [],

  getInsumos: async () => {
    const res = await fetch('/api/insumos')
    const insumos = await res.json()
    set({ insumos })
  },

  setSelectedPedidoInsumo: (pedidoInsumo) => set((state) => ({
    selectedPedidoInsumos: [ ...state.selectedPedidoInsumos, pedidoInsumo]
  })),

  setSelectedInsumos: (insumo) => set((state) => ({
    selectedInsumos: [...state.selectedInsumos, insumo],
  })),
  
  setSelectedInsumo: (insumo) => set({ selectedInsumo: insumo}),

  updateInsumo: async (id, insumo) => {
    const res = await fetch(`/api/insumos/` + id, {
      method: 'PUT',
      body: JSON.stringify(insumo),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to update insumo');
    }

    const data = await res.json()

    set((state) => ({
      insumos: state.insumos.map((insumo) => (insumo.id === id ? data : insumo)),
    }))
  },

  findInsumo: async (id) => {
    const res = await fetch(`/api/insumos/${id}`)
    const insumo = await res.json()
    return insumo
  },
}));