'use client'
import  EditObrasForm from '@/components/forms/obras/EditObra'
import { Obra } from '@prisma/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { useObrasStore } from '@/context/ObrasContext'
import { useUserStore } from '@/context/UserContext'
import EditUsersForm from '@/components/forms/EditUserForm'


interface Params {
  params: { id: number}
}

const EditUser = ({ params }: Params) => {
  const { id } = params

  const selectedUser = useUserStore(state => state.selectedUser)

  const initialValues = {
    id: id,
    email: selectedUser?.email || '',
    nombre: selectedUser?.nombre || '',
    username: selectedUser?.username || '',
    edad: selectedUser?.edad as number,
    password: selectedUser?.password || '',
    idNumber: selectedUser?.idNumber as number,
    celular: selectedUser?.celular as number,
    createdAt: selectedUser?.createdAt instanceof Date ? selectedUser.createdAt : new Date(selectedUser?.createdAt || ''),
    updatedAt: selectedUser?.updatedAt instanceof Date ? selectedUser.updatedAt : new Date(selectedUser?.updatedAt || ''),
  }

  return (
    <div className="flex items-center justify-center h-screen mx-4">
    <EditUsersForm initialValues={initialValues} id={id}/>
  </div>
  )
}

export default EditUser