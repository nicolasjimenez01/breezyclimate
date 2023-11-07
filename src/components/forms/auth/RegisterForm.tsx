'use client'
import { LinearProgress, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-mui';
import  React from 'react';
import { NextResponse } from "next/server";
import { RegisterUserValidation } from '@/utils/validation';
import MenuItem from '@mui/material/MenuItem';
import { useUserStore } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useFormikContext } from 'formik';

function RegisterForm() {

  const formik = useFormikContext();

  const router = useRouter()

  const [ 
    createUser, 
  ] = useUserStore(state => [
    state.createUser, 
  ])

  return (
    <Formik
      initialValues={{
        email: '',
        nombre: '',
        username: '',
        edad: '',
        password: '',
        idNumber: '',
        celular: ''
      }}
      validationSchema={RegisterUserValidation}
      onSubmit={async (e, { setSubmitting }) => {
        try {
          const newUser = await createUser({
            ...e,
            idNumber: Number(e.idNumber),
            password: e.idNumber,
            celular: Number(e.celular),
            edad: Number(e.edad),
            nombre: e.nombre,
            email: e.email
          })
          toast.success('Usuario creado');
          await new Promise((resolve) => setTimeout(resolve, 2000))
          if(newUser){
            router.push('/users')
          }
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
      {({ submitForm, isSubmitting, values }) => (
        <Form>
          <div className='flex items-center justify-center mb-4'>
            <h2 className='font-bold text-4xl'>
              Register
            </h2>
          </div>

            <Field
              component={TextField}
              name="email"
              placeholder="usuario@mail.com"
              label="Correo"
              type="email"
              sx={{mt:2, mr:4}}
              style={{width:320}}
            />


            <Field
              component={TextField}
              type="text"
              label="Nombre"
              name="nombre"
              placeholder="Juanito"
              sx={{mt:2}}
              style={{width:320}}
            />

            <br/>

            <Field
              component={TextField}
              type="text"
              label="Cedula"
              name="idNumber"
              placeholder="123456"
              sx={{mt:2, mr:4}}
              style={{width:320}}
            />

            <Field
              component={TextField}
              label="Username"
              name="username"
              placeholder="usuario"
              sx={{mt:2}}
              style={{width:320}}
            />
            <br/>

            <Field
              component={TextField}
              label="Edad"
              name="edad"
              placeholder="XX"
              sx={{mt:2, mr:4}}
              style={{width:320}}
            />

            <Field
              component={TextField}
              label="Celular"
              name="celular"
              placeholder="12345"
              sx={{mt:2}}
              style={{width:320}}
            />


          <br/>

          <div className='mt-2'>
            {isSubmitting && <LinearProgress />}
          </div>
          
          <br />
                  
          <div className="flex items-center justify-center ">
            <button className="bg-menta hover:bg-mentaHover text-white color-white font-bold py-2 px-4 rounded w-40 text-xl " 
              disabled={isSubmitting}
              onClick={submitForm}
              >
              Registrar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm
