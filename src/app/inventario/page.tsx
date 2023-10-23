'use client'
import SearchBox from "@/components/common/Search"
import InventarioTable from "@/components/tables/InventarioTable"


export default function InventarioPage() {
  return (
    <>
      <div className="mx-10 flex flex-col justify-center items-center h-screen mb-10">
        <div className="mt-10">
          <SearchBox/>
        </div>
        <InventarioTable/>
      </div>
    </>
  )
}