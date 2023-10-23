import { useInsumosStore } from "@/context/InsumoContext"
import EditInsumoDialog from "@/components/modal/EditInsumo"
import { useRouter } from "next/navigation"

interface Params {
  params: { id: number}
}

const EditInsumoPage = ( { params }: Params) => {

  const router = useRouter()

  const { id } = params

  const selectedInsumo = useInsumosStore(state => state.selectedInsumo)

  const initialValues = {
    id: id,
    nomInsumo: selectedInsumo?.nomInsumo || '',
    proveedor: selectedInsumo?.proveedor || '',
    cantStock: selectedInsumo?.cantStock || 0,
    precio: selectedInsumo?.precio || 0,
    createdAt: selectedInsumo?.createdAt instanceof Date ? selectedInsumo.createdAt : new Date(selectedInsumo?.createdAt || ''),
    updatedAt: selectedInsumo?.updatedAt instanceof Date ? selectedInsumo.updatedAt : new Date(selectedInsumo?.updatedAt || ''),
  }

  return (
    <EditInsumoDialog  insumo={initialValues} onClose={() => router.back()} isOpen={true}/>
  )
}

export default EditInsumoPage