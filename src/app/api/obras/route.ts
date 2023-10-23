import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


export async function GET(){
  try{
    const obras = await prisma.obra.findMany()
    return NextResponse.json(obras)
  } catch(error) {
    if(error instanceof Error){
      return NextResponse.json({
        message: error.message
      }, {
        status: 500
      })
    }
  }
}

export async function POST(request: Request){
  try{
    const {nomObra, nomOficial, celOficial, contactoObra, celContacto, ciudad, direccion, fecha} = await request.json()
  
    const newObra = await prisma.obra.create({
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
  
    return NextResponse.json(newObra)
  }catch(error){
    if(error instanceof Error){
      return NextResponse.json({
        message: error.message
      }, {
        status: 500
      })
    }
  }
}