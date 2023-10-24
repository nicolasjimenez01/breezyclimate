
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/libs/prisma";

export async function GET(){
  try{
    const pedidos = await prisma.pedidoInsumo.findMany()
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
    const pedidosInsumo = await request.json();

    if (!Array.isArray(pedidosInsumo)) {
      throw new Error('Se espera un array de insumos en la solicitud.');
    }

    // Crea los insumos en la base de datos
    const nuevosInsumos = await prisma.pedidoInsumo.createMany({
      data: pedidosInsumo,
    });

    return NextResponse.json(nuevosInsumos);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

// export async function POST(request: Request){
//   try{
//     const {  
//       cantidad,
//       total,
//       pedidoId,
//       insumoId 
//     } = await request.json()
  
//     const newObra = await prisma.pedidoInsumo.create({
//       data: {
//         cantidad,
//         total,
//         pedidoId,
//         insumoId
//       }
//     })
  
//     return NextResponse.json(newObra)
//   }catch(error){
//     if(error instanceof Error){
//       return NextResponse.json({
//         message: error.message
//       }, {
//         status: 500
//       })
//     }
//   }
// }