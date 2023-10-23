'use client'
import { Button, LinearProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import Box from '@mui/material/Box';
import { useMedidaMayorA, useMedidaMenorA } from './operations';
import { useEffect } from 'react';
import Step1 from './step1';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Step2 from './step2';

interface Values {
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

const steps = ['Ingresar medidas', 'Elegir insumos'];

export default function RecLaminaForm() {

  const [inputMedidaMayorA, setInputMedidaMayorA] = useMedidaMayorA();
  const [inputMedidaMenorA, setInputMedidaMenorA] = useMedidaMenorA();

  const forms = [<Step1 key="step1"/>, <Step2 key='step2'/>];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    setInputMedidaMayorA((prevInputMedidaMayorA) => {
      if (prevInputMedidaMayorA !== inputMedidaMayorA) {
        return inputMedidaMayorA;
      }
      return prevInputMedidaMayorA;
    });

    setInputMedidaMenorA((prevInputMedidaMenorA) => {
      if (prevInputMedidaMenorA !== inputMedidaMenorA) {
        return inputMedidaMenorA;
      }
      return prevInputMedidaMenorA;
    });
  }, [inputMedidaMayorA, inputMedidaMenorA, setInputMedidaMayorA, setInputMedidaMenorA]);

  return (
    <Formik
      initialValues={{
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
        tags: []
      }}
      validate={(values) => {
        // const errors: Partial<Values> = {};
        // if (!values.email) {
        //   errors.email = 'Required';
        // } else if (
        //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        // ) {
        //   errors.email = 'Invalid email address';
        // }
        // return errors;
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
        <Box sx={{ width: '100%' }}>
          <div className='mb-4 w-full'>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  return (
                    <Step key={index} {...stepProps} className=''>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
          <div className='w-full'>
            {forms[activeStep]}
          </div>
          {activeStep !== steps.length &&
            
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                  {activeStep === steps.length - 1 ? 
                  <Button 
                    className="bg-menta hover:bg-mentaHover text-white color-white font-bold py-2 px-4 rounded w-40 text-xl" disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Guardar
                  </Button> 
                  : 
                  <Button 
                  className="bg-menta hover:bg-mentaHover text-white color-white font-bold py-2 px-4 rounded w-40 text-xl"
                  onClick={handleNext}
                  >
                    Next
                  </Button>}
              </Box>
            
          }
        </Box>


          {isSubmitting && <LinearProgress />}
        </Form>
      )}
    </Formik>
  );
}
