'use client'
import { CreateObra, UpdateObra } from '@/interfaces/Obra'
import { Obra } from '@prisma/client'
import { create } from "zustand"

interface ObrasStore {
  obras: Obra[];
  selectedObra: Obra | null;
  getObras: () => Promise<void>;
  createObra: (obra: CreateObra) => Promise<void>;
  deleteObra: (id: number) => Promise<void>;
  setSelectedObra: (obra: Obra | null) => void;
  updateObra: (id: number, obra: UpdateObra) => Promise<void>;
}

export const useObrasStore = create<ObrasStore>((set) => ({
  obras: [],
  selectedObra: null,

  getObras: async () => {
    const res = await fetch('/api/obras');
    const obras = await res.json();
    set({ obras });
  },

  createObra: async (obra) => {
    const res = await fetch('/api/obras', {
      method: 'POST',
      body: JSON.stringify(obra),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const createdObra = await res.json();
    set((state) => ({ obras: [...state.obras, createdObra] }));
  },

  deleteObra: async (id) => {
    await fetch(`http://localhost:3000/api/obras/${id}`, {
      method: 'DELETE',
    });
    set((state) => ({ obras: state.obras.filter((obra) => obra.id !== id) }));
  },

  setSelectedObra: (obra) => set({ selectedObra: obra }),

  updateObra: async (id, obra) => {
    const res = await fetch(`/api/obras/` + id, {
      method: 'PUT',
      body: JSON.stringify(obra),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await res.json();
    set((state) => ({
      obras: state.obras.map((obra) => (obra.id === id ? data : obra)),
    }));
  },
}));