


import PedidosTable from "@/components/tables/PedidosTable"
import Link from "next/link"
import SearchBox from "@/components/common/Search"


export default function ObrasPage() {
  return (
    <>
      <div className="mx-10 flex flex-col justify-center items-center h-screen">
        <div className="mt-10">
          <SearchBox/>
        </div>
        <PedidosTable/>
      </div>
    </>
  )
}