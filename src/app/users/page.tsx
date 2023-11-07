
'use client'
import Link from "next/link"
import UsersTable from "@/components/tables/UsuariosTable"


export default function ObrasPage() {
  return (
    <>
      <div className="mx-10 flex flex-col justify-center items-center h-screen">
        <div className="mb-10">
          {/* <Button variant="outlined" sx={{color: '##3DD9BC'}}>Insertar</Button> */}
          <Link href='/auth/register'>
            <button className="bg-menta hover:bg-mentaHover text-white color-white font-bold py-2 px-4 rounded w-40 text-xl">
            Insertar
            </button>
          </Link>
        </div>
        <UsersTable/>
      </div>
    </>
  )
  }