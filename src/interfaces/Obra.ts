

import { Obra, PedidoInsumo, Pedido, User } from "@prisma/client"
import { Insumo } from "@prisma/client"



export type CreateObra = Omit<Obra, 'id' |'createdAt' |'updatedAt'>

export type UpdateObra = Partial<CreateObra>



export type CreateInsumo = Omit<Insumo, 'id' | 'createdAt' | 'updatedAT'>

export type UpdateInsumo = Partial<CreateInsumo>



export type CreatePedido = Omit<Pedido, 'id' | 'createdAt' | 'updatedAt'>



export type CreatePedidoInsumos = Omit<PedidoInsumo, 'id' | 'createdAt' | 'updatedAt' >


export type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateUser = Partial<CreateUser>