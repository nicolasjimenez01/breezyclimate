'use client'
import SearchBox from "@/components/common/Search"
import InventarioTable from "@/components/tables/InventarioTable"

const allowedRoles = [
  'ALMACENISTA',
  'ADMINISTRADOR'
]


export default function InventarioPage() {
  return (
    <>
      <div className="mx-10 flex flex-col justify-center items-center h-screen mb-10 mt-10">
        <InventarioTable/>
      </div>
    </>
  )
}