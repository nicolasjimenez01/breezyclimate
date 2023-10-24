'use client'
import { Button, LinearProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import Box from '@mui/material/Box';
import { useMedidaMayorA, useMedidaMenorA, usePromMedA, useMedidaMayorB, useMedidaMenorB, usePromMedB, usePromedioPerimetro, useCantPiezas, useLongitud, useArea, useCantSoportes, useDistSoportes } from './operations';
import { useEffect } from 'react';
import Step1 from './step1';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Step2 from './step2';
import { formatRFC3339 } from 'date-fns';
import { PedidoInsumo } from '@prisma/client';
import { usePedidosStore } from '@/context/PedidosContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { NextResponse } from 'next/server';
import { usePedidosInsumosStore } from '@/context/PedidosInsumosContext';
import { CreatePedidoInsumos } from '@/interfaces/Obra';
import { useInsumosStore } from '@/context/InsumoContext';
import { toast } from 'sonner';

interface Values {
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
  pedidoInsumos: PedidoInsumo[]
}

const initialValues: Values = {
  medidaMayorA: Number(''),
  medidaMenorA: Number(''),
  medidaMayorB: Number(''),
  medidaMenorB: Number(''),
  promedioA: Number(''),
  promedioB: Number(''),
  longitudDuctos: Number(''),
  cantPiezas: Number(''),
  distSoportes: Number(''),
  longSoportes: Number(''),
  cantSoportes: Number(''),
  perimetro: Number(''),
  areaM2: Number(''),
  rejillasDifusores: Number(''),
  tieRoad: Number(''),
  ciudad: '',
  dirección: '',
  fecha: new Date(),
  pedidoInsumos: []
}

interface Params {
  params: { id: string }
}

const steps = ['Ingresar medidas', 'Elegir insumos'];

export default function RecLaminaForm() {

  const router = useRouter()

  const searchParams = useSearchParams()

  const codObra = searchParams.get('codObra')

  const [ 
    selectedPedidoInsumos,
  ] = useInsumosStore(state => [
    state.selectedPedidoInsumos,
  ])

  const createPedido = usePedidosStore(state => state.createPedido)
  const createPedidoInsumos = usePedidosInsumosStore(state => state.createPedidosInsumos)

  const [inputMedidaMayorA, setInputMedidaMayorA] = useMedidaMayorA();
  const [inputMedidaMenorA, setInputMedidaMenorA] = useMedidaMenorA();
  const resultPromMedA = usePromMedA();

  const [inputMedidaMayorB, setInputMedidaMayorB] = useMedidaMayorB();
  const [inputMedidaMenorB, setInputMedidaMenorB] = useMedidaMenorB();
  const resultPromMedB = usePromMedB();

  const resultPerimetro = usePromedioPerimetro();

  const [inputLongitud, setInputLongitud] = useLongitud();

  
  const resultCantPiezas = useCantPiezas();

  const resultArea = useArea();

  const [inputDistSoportes, setInputDistSoportes] = useDistSoportes()
  const resultCantSoportes = useCantSoportes();


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
      initialValues={initialValues}
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
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { pedidoInsumos, ...data} = values
          const fechaFormat = formatRFC3339(new Date(values.fecha), { fractionDigits: 3})
          const createdPedido = await createPedido({
            ...data,
            medidaMayorA: Number(inputMedidaMayorA),
            medidaMenorA: Number(inputMedidaMenorA),
            medidaMayorB: Number(inputMedidaMayorB),
            medidaMenorB: Number(inputMedidaMenorB),
            longitudDuctos: Number(inputLongitud),
            cantPiezas: Number(resultCantPiezas),
            distSoportes: Number(inputDistSoportes),
            longSoportes: Number(values.longSoportes),
            cantSoportes: Number(resultCantSoportes),
            perimetro: Number(resultPerimetro),
            areaM2: Number(resultArea),
            rejillasDifusores: Number(values.rejillasDifusores),
            tieRoad: Number(values.tieRoad),
            promMedA: Number(resultPromMedA),
            promMedB: Number(resultPromMedB),
            direccion: values.dirección,
            obraId: Number(codObra),
            fecha: new Date(fechaFormat)
          })
          
          const pedidoInsumoData: CreatePedidoInsumos[] = selectedPedidoInsumos.map((e) => ({
            cantidad: Number(e.cantidad),
            precio: Number(e.precio),
            total: Number(e.total),
            insumoId: Number(e.insumoId),
            pedidoId: createdPedido.id,
          }));

         
          await createPedidoInsumos(pedidoInsumoData)

          toast.success('Pedido creado');
          await new Promise((resolve) => setTimeout(resolve, 2000))
          router.push('/pedidos/leer')
        } catch (error) {
          if(error instanceof Error){
            return NextResponse.json({
              message: error.message
            }, {
              status: 500
            })
          }
        }
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
