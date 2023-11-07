import NextAuth from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
import { prisma } from "@/libs/prisma"
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { laber: "Username", type: "text", placeholder: "user"},
        password: { label: "Password", type: "password", placeholder: "*****"}
      },
      async authorize(credentials, req) {

        const userFound = await prisma.user.findUnique({
          where: {
            username: credentials?.username
          }
        })

        if(!userFound) throw new Error('El usuario no existe')

        const matchPassword = await bcrypt.compare(credentials?.password, userFound.password)

        if(!matchPassword) throw new Error('Contraseña incorrecta')

        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        }
      }
    })
  ],
  // pages: {
  //   signIn: '/auth/login',
  // },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }