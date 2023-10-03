'use client'
import { Button, LinearProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Text } from '@chakra-ui/react';

interface Values {
  email: string;
  password: string;
  codObra: string;
  nomObra: string;
  nomOficial: string;
  celOficial: string;
  contactoObra: string;
  celContacto: string;
  ciudad: string;
  dirección: string;
  fecha: Date;
}

export default function ObrasForm() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        codObra: '',
        nomObra: '',
        nomOficial: '',
        celOficial: '',
        contactoObra: '',
        celContacto: '',
        ciudad: '',
        dirección: '',
        fecha: new Date(),
        
      }}
      validate={(values) => {
        const errors: Partial<Values> = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
            <Field
              component={TextField}
              name="codObra"
              label="Código Obra"
              sx={{mr: 4}}
              style={{width:320}}
            />
          
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
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
            sx={{mt:2}}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}