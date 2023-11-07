'use client'
import { LinearProgress, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-mui';
import  React from 'react';
import { NextResponse } from "next/server";
import { RegisterUserValidation } from '@/utils/validation';
import { Role } from '@prisma/client';
import MenuItem from '@mui/material/MenuItem';
import { useUserStore } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function RegisterForm() {

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
        username: '',
        rol: '',
        password: '',
        idNumber: ''
      }}
      validationSchema={RegisterUserValidation}
      onSubmit={async (e, { setSubmitting }) => {
        try {
          const newUser = await createUser({
            ...e,
            rol: e.rol as Role,
            idNumber: Number(e.idNumber),
            password: e.idNumber
          })
          toast.success('Usuario creado');
          await new Promise((resolve) => setTimeout(resolve, 2000))
          if(newUser){
            router.push('/')
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
      {({ submitForm, isSubmitting }) => (
        <Form>
          <div className='flex items-center justify-center mb-4'>
            <h2 className='font-bold text-4xl'>
              Register
            </h2>
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor='username'>Username</label>
            <Field
              component={TextField}
              id="username"
              name="username"
              placeholder="usuario"
              style={{width:320}}
            />
          

          <br/>
          
          <label htmlFor="email">Email</label>
          <Field
            component={TextField}
            name="email"
            placeholder="usuario@mail.com"
            type="email"
            id="email"
            style={{width:320}}
          />
          

          <br/>

          <label htmlFor="rol">Rol</label>
          <Field
              component={Select}
              type="text"
              id="rol"
              name="rol"
              // inputProps={{ name: 'Rol', id: 'rol' }}
              // onChange={}
              style={{width:320}}
              // placeholder="OFICIAL"
            >
              {Object.values(Role).map((role, index) => (
                <MenuItem key={index} value={role}>
                  {role}
                </MenuItem>
              ))}
          </Field>

          <br/>

          <label htmlFor="idNumber">Cedula</label>
          <Field
            component={TextField}
            type="text"
            id="idNumber"
            name="idNumber"
            placeholder="123456"
            style={{width:320}}
          />

          </Box>

          <br/>

          {isSubmitting && <LinearProgress />}

          
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
