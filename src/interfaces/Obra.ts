

import { Obra, PedidoRecLamina } from "@prisma/client"
import { Insumo } from "@prisma/client"



export type CreateObra = Omit<Obra, 'id' |'createdAt' |'updatedAt'>

export type UpdateObra = Partial<CreateObra>

export type CreateInsumo = Omit<Insumo, 'id' | 'createdAt' | 'updatedAT'>

export type UpdateInsumo = Partial<CreateInsumo>


export type CreatePedido = Omit<PedidoRecLamina, 'id' | 'createdAt' | 'updatedAt'>