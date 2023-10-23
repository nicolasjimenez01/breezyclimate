import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/libs/prisma";

export async function GET(){
  try{
    const pedidos = await prisma.pedidoRecLamina.findMany()
    return NextResponse.json(pedidos)
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

export async function POST(request: NextRequest) {
  try {
    const { 
      medidaMayorA,
      medidaMenorA,
      medidaMayorB,
      medidaMenorB,
      promMedA,
      promMedB,
      longitudDuctos,
      cantPiezas,
      distSoportes,
      longSoportes,
      cantSoportes,
      perimetro,
      areaM2,
      rejillasDifusores,
      tieRoad,
      ciudad,
      direccion,
      fecha,
      obra,
      obraId,
      pedidoInsumos
    } = await request.json()
    const nuevoPedido = await prisma.pedidoRecLamina.create({
      data: {
        medidaMayorA,
        medidaMenorA,
        medidaMayorB,
        medidaMenorB,
        promMedA,
        promMedB,
        longitudDuctos,
        cantPiezas,
        distSoportes,
        longSoportes,
        cantSoportes,
        perimetro,
        areaM2,
        rejillasDifusores,
        tieRoad,
        ciudad,
        direccion,
        fecha,
        obra,
        obraId,
        pedidoInsumos
      }
    })

    return NextResponse.json(nuevoPedido);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}