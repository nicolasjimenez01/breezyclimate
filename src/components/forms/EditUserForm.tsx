'use client'
import { Button, LinearProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import  React from 'react';
import { Obra, User } from '@prisma/client';
import { useObrasStore } from '@/context/ObrasContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import { useUserStore } from '@/context/UserContext';

interface Edit {
  initialValues: User
  id: number
}

export default function EditUsersForm({initialValues, id}: Edit) {

  const router = useRouter()

  const updateUser = useUserStore(state => state.updateUser)


  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      // validate={(values) => {
      //   const errors: Partial<Values> = {};
      //   if (!values.email) {
      //     errors.email = 'Required';
      //   } else if (
      //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      //   ) {
      //     errors.email = 'Invalid email address';
      //   }
      //   return errors;
      // }}
      onSubmit={async (e, { setSubmitting }) => {
        try {
          // if(e.fecha) formatRFC3339(new Date(e.fecha), { fractionDigits: 3 })
          await updateUser(id, {
            email: e.email,
            nombre: e.nombre,
            username: e.username,
            edad: e.edad,
            password: e.idNumber.toString(),
            idNumber: e.idNumber,
            celular: e.celular
          });
          toast.success('Usuario actualizado');
          await new Promise((resolve) => setTimeout(resolve, 2000))
          router.push('/users')
        } catch (error) {
          if(error instanceof Error){
            return NextResponse.json({
              message: error.message
            }, {
              status: 500
            })
          }
        }finally {
          setSubmitting(false);
        }
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            label="Nombre"
            name="nombre"
            sx={{mt:2, mr: 4}}
            style={{width:320}}
          >{initialValues.nombre}</Field>


          <Field
            component={TextField}
            name="email"
            label="Email"
            type="email"
            sx={{mt:2, mr:4}}
            style={{width:320}}
          >{initialValues.email}</Field>

          <br/>

          <Field 
            component={TextField}
            name="idNumber"
            label="Cedula"
            sx={{mt:2, mr: 4}}
            style={{width:320}}
          >{initialValues.idNumber}</Field>


          <Field
            component={TextField}
            name="username"
            label="Username"
            sx={{mt:2, mr:4}}
            style={{width:320}}
          >{initialValues.username}</Field>

          <br/>

          <Field 
            component={TextField}
            name="edad"
            label="Edad"
            sx={{mt:2, mr: 4}}
            style={{width:320}}
          >{initialValues.edad}</Field>


          <Field 
            component={TextField}
            name="celular"
            label="Celular"
            sx={{mt:2, mr:4}}
            style={{width:320}}
          >{initialValues.celular}</Field>
          
          <br/>

          {isSubmitting && <LinearProgress />}
          <br />
                  
          <button className="bg-azul-500 hover:bg-mentaHover text-white color-white font-bold py-2 px-4 rounded w-40 text-xl mt-10" 
          disabled={isSubmitting}
          onClick={submitForm}
          >
          Actualizar
          </button>
        </Form>
      )}
    </Formik>
  );
}