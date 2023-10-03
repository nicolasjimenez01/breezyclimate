'use client'
import { Button, LinearProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Text } from '@chakra-ui/react';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useMedidaMayorA, useMedidaMenorA, useResultado } from './operations';

interface Values {
  email: string;
  password: string;
  codObra: string;
  medidaMayorA: number;
  medidaMenorA: number;
  medidaMayorB: number;
  medidaMenorB: number;
  promedioA: number;
  promedioB: number;
  longitudDuctos: number;
  cantPiezas: number;
  distSoportes: number;
  longSoportes: number;
  cantSoportes: number;
  perimetro: number;
  areaM2: number;
  rejillasDifusores: number;
  tieRoad: number;
  ciudad: string;
  dirección: string;
  fecha: Date;
}

export default function RecLaminaForm() {
  const [inputMedidaMayorA, setInputMedidaMayorA] = useMedidaMayorA();
  const [inputMedidaMenorA, setInputMedidaMenorA] = useMedidaMenorA();
  const resultado = useResultado();
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        medidaMayorA: '',
        medidaMenorA: '',
        medidaMayorB: '',
        medidaMenorB: '',
        promedioA: '',
        promedioB: '',
        longitudDuctos: '',
        cantPiezas: '',
        distSoportes: '',
        longSoportes: '',
        cantSoportes: '',
        perimetro: '',
        areaM2: '',
        rejillasDifusores: '',
        tieRoad: '',
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
          <div className="flex">
            <div className="flex-1 mr-4 mt-3">
              <Field
                  component={TextField}
                  name="medidaMayorA"
                  label="Medida Mayor A"
                  sx={{mr: 4}}
                  type="number"
                  pattern="[0-9]*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e && e.target) {
                      setInputMedidaMayorA(parseFloat(e.target.value));
                      console.log(e.target.value)
                    }}}
                  value={inputMedidaMayorA}
                />
              
              <Field
                component={TextField}
                label="Medida Menor A"
                name="medidaMenorA"
                type="number"
                pattern="[0-9]*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e && e.target) {
                    setInputMedidaMenorA(parseFloat(e.target.value));
                    console.log(e.target.value)
                  }}}
                value={inputMedidaMenorA}
              />

              <br/>

              <Field
                component={TextField}
                name="medidaMayorB"
                label="Medida Mayor B"
                sx={{mt:2, mr:4}}
                type="number"
                pattern="[0-9]*"
              />

              <Field 
                component={TextField}
                name="medidaMenorB"
                label="Medida Menor B"
                sx={{mt:2}}
                type="number"
                pattern="[0-9]*"
              />

              <br/>

              <Field
                component={TextField}
                name="longintudDuctos"
                label="Longitud"
                sx={{mt:2, mr:4}}
                type="number"
                pattern="[0-9]*"
              />

              <br/>

              <Field 
                component={TextField}
                name="distSoportes"
                label="Distancia Soportes"
                sx={{mt:2, mr: 4}}
                type="number"
                pattern="[0-9]*"
              />

              <Field 
                component={TextField}
                name="longSoportes"
                label="Longitud Soportes"
                sx={{mt:2}}
                type="number"
                pattern="[0-9]*"
              />

              <br/>

              <Field 
                component={TextField}
                name="drejillasDifusores"
                label="Rejillas y Difusores"
                sx={{mt:2, mr: 4}}
                type="number"
                pattern="[0-9]*"
              />

              <Field 
                component={TextField}
                name="tieRoad"
                label="Tie Road"
                sx={{mt:2}}
                type="number"
                pattern="[0-9]*"
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
              </div>
              <div className="flex-2 ml-4 bg-grey p-2 rounded-lg">
              <div className='flex tems-center justify-center'>
              <Typography align="center">
                Medidas Cálculadas por <br/> el sistema
              </Typography>
              </div>
              <Field 
                component={TextField}
                name="promedioA"
                label="Promedio Medida A"
                // default value="0.00"
                InputProps={{readOnly: true,}}
                sx={{mt:2}}
                value={resultado}
              />

              <br/>

              <Field 
                component={TextField}
                name="promedioB"
                label="Promedio Medida B"
                default value="0.00"
                InputProps={{readOnly: true,}}
                sx={{mt:2}}
              />

              <br/>

              <Field 
                component={TextField}
                name="cantPiezas"
                label="Cantidad Piezas"
                default value="0.00"
                InputProps={{readOnly: true,}}
                sx={{mt:2}}
              />

              <br/>

              <Field 
                component={TextField}
                name="cantSoportes"
                label="Cantidad Soportes"
                default value="0.00"
                InputProps={{readOnly: true,}}
                sx={{mt:2, mr: 2}}
              />

              <br/>

              <Field 
                component={TextField}
                name="perimetro"
                label="Perimetro"
                default value="0.00"
                InputProps={{readOnly: true,}}
                sx={{mt:2}}
              />
              
              <br/>

              <Field 
                component={TextField}
                name="areaM2"
                label="Área M2"
                default value="0.00"
                InputProps={{readOnly: true,}}
                sx={{mt:2}}
              />
            </div>
          </div>

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
          <Link href='/obras/insert'>
            <button className="bg-menta hover:bg-mentaHover text-white color-white font-bold py-2 px-4 rounded w-40 text-xl">
            Insertar
            </button>
          </Link>
        </Form>
      )}
    </Formik>
  );
}
