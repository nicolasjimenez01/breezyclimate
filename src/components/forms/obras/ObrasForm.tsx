'use client'
import { Button, LinearProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import  React from 'react';
import { useRouter } from 'next/navigation';
import { formatRFC3339 } from 'date-fns'
import { NextResponse } from "next/server";
import { toast } from 'sonner';
import { useObrasStore } from '@/context/ObrasContext';
import { ObraValidation } from '@/utils/validation';

function ObrasForm() {

  const [ 
    createObra, 
    selectedObra 
  ] = useObrasStore(state => [
    state.createObra, 
    state.selectedObra
  ])
  
  const router = useRouter()

  return (
    <Formik
      initialValues={{
        codObra: '',
        nomObra: '',
        nomOficial: '',
        celOficial: '',
        contactoObra: '',
        celContacto: '',
        ciudad: '',
        direccion: '',
        fecha: new Date(),
      }}
      validationSchema={ObraValidation}
      onSubmit={async (e, { setSubmitting }) => {
        try {
          const fechaFormat = formatRFC3339(new Date(e.fecha), { fractionDigits: 3 })
          await createObra({
            ...e,
            fecha: new Date(fechaFormat), 
            
          });
          toast.success('Obra creada');
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
          />

          <br/>

          <Field
            component={TextField}
            name="nomOficial"
            label="Nombre Oficial"
            sx={{mt:2, mr:4}}
            style={{width:320}}
          />

          <Field 
            component={TextField}
            name="celOficial"
            label="Celular Oficial"
            sx={{mt:2}}
            style={{width:320}}
          />

          <br/>

          <Field
            component={TextField}
            name="contactoObra"
            label="Contacto Obra"
            sx={{mt:2, mr:4}}
            style={{width:320}}
          />

          <Field 
            component={TextField}
            name="celContacto"
            label="Celular Contacto"
            sx={{mt:2}}
            style={{width:320}}
          />

          <br/>

          <Field
            component={TextField}
            name="ciudad"
            label="Ciudad"
            sx={{mt:2, mr:4}}
          />

          <Field 
            component={TextField}
            name="direccion"
            label="Dirección"
            sx={{mt:2, mr:4}}
          />

          <Field 
            component={TextField}
            name="fecha"
            label="Fecha"
            type="Date"
            sx={{mt:2}}
          />

          {isSubmitting && <LinearProgress />}
          <br />
                  
            <button className="bg-menta hover:bg-mentaHover text-white color-white font-bold py-2 px-4 rounded w-40 text-xl mt-10" 
            disabled={isSubmitting}
            onClick={submitForm}
            >
            Guardar
            </button>
        </Form>
      )}
    </Formik>
  );
}

export default ObrasForm