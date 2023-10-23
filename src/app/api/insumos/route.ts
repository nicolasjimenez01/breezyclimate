import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


export async function GET(){
  try {
    const insumos = await prisma.insumo.findMany()
    return NextResponse.json(insumos)
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

// export async function POST(request: Request) {
//   try {
//     const insumos = await request.json();

//     // Verifica si la solicitud contiene un array de insumos
//     if (!Array.isArray(insumos)) {
//       throw new Error('Se espera un array de insumos en la solicitud.');
//     }

//     // Crea los insumos en la base de datos
//     const nuevosInsumos = await prisma.insumo.createMany({
//       data: insumos,
//     });

//     return NextResponse.json(nuevosInsumos);
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json(
//         {
//           message: error.message,
//         },
//         {
//           status: 500,
//         }
//       );
//     }
//   }
// }

// export async function POST(request: Request){
//   try {
//     const { nomInsumo, proveedor, cantStock, precio} = await request.json()
    
//     const newInsumo = await prisma.insumo.create({
//       data: {
//         nomInsumo,
//         proveedor,
//         cantStock,
//         precio
//       }
//     })

//     return NextResponse.json(newInsumo)
//   } catch(error){
//     if(error instanceof Error){
//       return NextResponse.json({
//         message: error.message
//       }, {
//         status: 500
//       })
//     }
//   }
// }