'use client'
import ObrasTable from "@/components/tables/ObrasTable"
import Link from "next/link"
import SearchBox from "@/components/common/Search"


export default function ObrasPage() {
  return (
    <>
      <div className="mx-10 flex flex-col justify-center items-center h-screen">
        <SearchBox/>
        <div className="mb-10">
          {/* <Button variant="outlined" sx={{color: '##3DD9BC'}}>Insertar</Button> */}
          <Link href='/obras/create'>
            <button className="bg-menta hover:bg-mentaHover text-white color-white font-bold py-2 px-4 rounded w-40 text-xl">
            Insertar
            </button>
          </Link>
        </div>
        <ObrasTable/>
      </div>
    </>
  )
}