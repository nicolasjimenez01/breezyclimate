'use client'
import  EditObrasForm from '@/components/forms/obras/EditObra'
import { Obra } from '@prisma/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { useObrasStore } from '@/context/ObrasContext'


interface Params {
  params: { id: number}
}


const EditObrasPage = ({params}: Params) => {

  const { id } = params;

  const selectedObra = useObrasStore(state => state.selectedObra)

  const initialValues = {
    id: id,
    nomObra: selectedObra?.nomObra || '',
    nomOficial: selectedObra?.nomOficial || '',
    celOficial: selectedObra?.celOficial || '',
    contactoObra: selectedObra?.contactoObra || '',
    celContacto: selectedObra?.celContacto || '',
    ciudad: selectedObra?.ciudad || '',
    direccion: selectedObra?.direccion || '',
    fecha: selectedObra?.fecha instanceof Date ? selectedObra.fecha : new Date(selectedObra?.fecha || ''),
    createdAt: selectedObra?.createdAt instanceof Date ? selectedObra.createdAt : new Date(selectedObra?.createdAt || ''),
    updatedAt: selectedObra?.updatedAt instanceof Date ? selectedObra.updatedAt : new Date(selectedObra?.updatedAt || ''),
  }

  return (
    <EditObrasForm initialValues={initialValues} id={id}/>
  )
}

export default EditObrasPage