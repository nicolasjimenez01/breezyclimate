import { NextResponse } from "next/server";
import { Prisma } from '@prisma/client'
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string }
}

export async function GET(request: Request, { params }: Params){
  try {
    const obra = await prisma.obra.findUnique({
      where: {
        id: Number(params.id)
      }
    })
    

    if(!obra) return NextResponse.json({message: 'Obra not found'}, { status: 404})

    return NextResponse.json(obra)

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

export async function DELETE(request: Request, { params }: Params){
  try {
    const deletedObra = await prisma.obra.delete({
      where: {
        id: Number(params.id)
      }
    })
  
    if(!deletedObra) return NextResponse.json({message: 'Obra not found'}, { status: 404})
  
    return NextResponse.json(deletedObra)
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

export async function PUT(request: Request, { params }: Params){

  try {
    const {nomObra, nomOficial, celOficial, contactoObra, celContacto, ciudad, direccion, fecha} = await request.json()

    const updatedObra = await prisma.obra.update({
      where: {
        id: Number(params.id)
      },
      data: {
        nomObra,
        nomOficial,
        celOficial,
        contactoObra,
        celContacto,
        ciudad,
        direccion,
        fecha
      }
    })
    return NextResponse.json(updatedObra)
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