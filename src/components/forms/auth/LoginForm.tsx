'use client'
import { LinearProgress, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-mui';
import  React from 'react';
import { NextResponse } from "next/server";
import { useUserStore } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react'

function LoginForm() {

  const router = useRouter()

  const [ 
    createUser, 
  ] = useUserStore(state => [
    state.createUser, 
  ])

  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      // validationSchema={RegisterUserValidation}
      onSubmit={async (e, { setSubmitting }) => {
        try {
          console.log(e)
          const res = await signIn('credentials', {
            username: e.username,
            password: e.password,
            redirect: false
          })
          if(res?.error){
            toast.error(res.error)
          } else {
            router.push('/')
          }

          console.log(res)
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
              Login
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
          
          <label htmlFor="password">Contraseña</label>
          <Field
            component={TextField}
            name="password"
            placeholder="*******"
            type="password"
            id="password"
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
              Ingresar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm
