'use client'
import { User } from "@prisma/client"
import { create } from "zustand"
import { CreateUser, UpdateUser } from "@/interfaces/Obra"
import { useRouter } from "next/router"

interface UserStore {
  users: User[]
  getUsers: () => Promise<void>
  createUser: (user: CreateUser) => Promise<User>
  deleteUser: (id: number) => Promise<void>;
  updateUser: (id: number, user: UpdateUser) => Promise<void>;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  findUser: (id: number) => void
}


export const useUserStore = create<UserStore>((set) => ({
  users: [],
  selectedUser: null,

  getUsers: async () => {
    const res = await fetch('/api/auth/register')
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
    await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'DELETE',
    });
    set((state) => ({ users: state.users.filter((pedido) => pedido.id !== id) }));
  },

  updateUser: async (id, user) => {
    const res = await fetch(`/api/users/` + id, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await res.json();
    set((state) => ({
      users: state.users.map((user) => (user.id === id ? data : user)),
    }));
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  findUser:  async (id) => {
    const res = await fetch('http://localhost:3000/api/users' + id)
    const user = await res.json
    return user
  }
}))