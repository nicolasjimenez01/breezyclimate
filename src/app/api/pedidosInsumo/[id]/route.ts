import { NextRequest, NextResponse } from "next/server";
import { Prisma } from '@prisma/client'
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string }
}

export async function DELETE(request: NextRequest, { params }: Params){
  try {
    const deletedPedido = await prisma.pedidoInsumo.delete({
      where: {
        id: Number(params.id)
      }
    })

    if(!deletedPedido) return NextResponse.json({ message: 'Pedido not found'}, { status: 404 })

    return NextResponse.json(deletedPedido)
  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError){
      if(error.code === "P2025"){
        return NextResponse.json({
          message: 'Obra not found'
        }, {
          status: 404
        })
      }

      return NextResponse.json({
        message: error.message
      }, {
        status: 500
      })
    }
  }
}