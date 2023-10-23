'use client'
import { Button, LinearProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import  React from 'react';
import { Obra } from '@prisma/client';
import { useObrasStore } from '@/context/ObrasContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';

interface Edit {
  initialValues: Obra
  id: number
}

export default function EditObrasForm({initialValues, id}: Edit) {

  const router = useRouter()

  // const fecha = initialValues.fecha
  // console.log(new Date(fecha))
  // const fechaFormat = format(new Date(fecha), 'dd/MM/yyyy')
  // console.log(fechaFormat)
  const  updateObra  = useObrasStore(state => state.updateObra)


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
          await updateObra(id, {
            celContacto: e.celContacto,
            celOficial: e.celOficial,
            ciudad: e.ciudad,
            contactoObra: e.contactoObra,
            direccion: e.direccion,
            fecha: e.fecha,
            nomObra: e.nomObra,
            nomOficial: e.nomOficial
          });
          toast.success('Obra actualizada');
          await new Promise((resolve) => setTimeout(resolve, 2000))
          router.push('/obras')
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
            label="Nombre Obra"
            name="nomObra"
            style={{width:320}}
          >{initialValues.nomObra}</Field>

          <br/>

          <Field
            component={TextField}
            name="nomOficial"
            label="Nombre Oficial"
            sx={{mt:2, mr:4}}
            style={{width:320}}
          >{initialValues.nomOficial}</Field>

          <Field 
            component={TextField}
            name="celOficial"
            label="Celular Oficial"
            sx={{mt:2}}
            style={{width:320}}
          >{initialValues.celOficial}</Field>

          <br/>

          <Field
            component={TextField}
            name="contactoObra"
            label="Contacto Obra"
            sx={{mt:2, mr:4}}
            style={{width:320}}
          >{initialValues.contactoObra}</Field>

          <Field 
            component={TextField}
            name="celContacto"
            label="Celular Contacto"
            sx={{mt:2}}
            style={{width:320}}
          >{initialValues.celContacto}</Field>

          <br/>

          <Field
            component={TextField}
            name="ciudad"
            label="Ciudad"
            sx={{mt:2, mr:4}}
          >{initialValues.ciudad}</Field>

          <Field 
            component={TextField}
            name="direccion"
            label="Dirección"
            sx={{mt:2, mr:4}}
          >{initialValues.direccion}</Field>

          <Field 
            component={TextField}
            name="fecha"
            label="Fecha"
            type="Date"
            sx={{mt:2}}
          >{initialValues.fecha}</Field>

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