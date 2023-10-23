import { NextRequest, NextResponse } from "next/server";
import { Prisma } from '@prisma/client'
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: Params){
  try {
    const pedido = await prisma.pedidoRecLamina.findUnique({
      where: {
        id: Number(params.id)
      }
    })

    if(!pedido) return NextResponse.json({ message: 'Pedido not foun'})
    
    return NextResponse.json(pedido)
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json({
        message: error.message
      }, {
        status: 500
      })
    }
  }
}

export async function DELETE(request: NextRequest, { params }: Params){
  try {
    const deletedPedido = await prisma.pedidoRecLamina.delete({
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