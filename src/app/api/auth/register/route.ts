import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { email, nombre, username, edad, password, idNumber, celular } = data
  
    const emailFound = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })
  
    if(emailFound){
      return NextResponse.json({
        message: "Email already exist"
      }, {
        status: 400
      })
    }
  
    const userNameFound = await prisma.user.findUnique({
      where: {
        username: data.username
      }
    })
  
    if(userNameFound){
      return NextResponse.json({
        message: "Username already exist"
      }, {
        status: 400
      })
    }
  
    // const idNumberFound = await prisma.user.findUnique({
    //   where: {
    //     idNumber: data.idNumber
    //   }
    // })
  
    // if(idNumberFound){
    //   return NextResponse.json({
    //     message: "Username already exist"
    //   }, {
    //     status: 400
    //   })
    // }
  
  
    const hashPassword = await bcrypt.hash(data.password, 10)
  
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
        nombre,
        edad,
        celular,
        idNumber
      }
    })
  
    const {password: _, ...user} = newUser
  
    return NextResponse.json(user)
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

export async function GET(){
  try {
    const usuarios = await prisma.user.findMany()
    return NextResponse.json(usuarios)
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

