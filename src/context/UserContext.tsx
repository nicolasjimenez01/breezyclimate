'use client'
import { User } from "@prisma/client"
import { create } from "zustand"
import { CreateUser } from "@/interfaces/Obra"
import { useRouter } from "next/router"

interface UserStore {
  users: User[]
  getUsers: () => Promise<void>
  createUser: (user: CreateUser) => Promise<User>
  deleteUser: (id: number) => Promise<void>;
}


export const useUserStore = create<UserStore>((set) => ({
  users: [],

  getUsers: async () => {
    const res = await fetch('/api/auth/users')
    const users = await res.json()
    set({ users })
  },

  createUser: async (user) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
      }
    })
    const createdUser = await res.json()
    set((state) => ({ users: [...state.users, createdUser]}))
    return createdUser
  },

  deleteUser: async (id) => {
    await fetch(`http://localhost:3000/api/pedidos/${id}`, {
      method: 'DELETE',
    });
    set((state) => ({ users: state.users.filter((pedido) => pedido.id !== id) }));
  }
}))