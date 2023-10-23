import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const insumo = await prisma.insumo.findUnique({
      where: {
        id: Number(params.id)
      }
    })

    if (!insumo) return NextResponse.json({ message: 'Insumo not found'}, { status: 404})

    return NextResponse.json(insumo)
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

export async function PUT(request: Request, { params }: Params){
  try {

    const { nomInsumo, proveedor, cantStock, precio} = await request.json()

    const updatedInsumo = await prisma.insumo.update({
      where: {
        id: Number(params.id)
      },
      data: {
        nomInsumo,
        proveedor,
        cantStock,
        precio
      }
    })

    return NextResponse.json(updatedInsumo)
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