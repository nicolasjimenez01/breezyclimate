
'use client'
import { Field } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useMedidaMayorA, useMedidaMenorA, usePromMedA, useMedidaMayorB, useMedidaMenorB, usePromMedB, usePromedioPerimetro, useCantPiezas, useLongitud, useArea, useCantSoportes, useDistSoportes } from './operations';

export default function Step1() {
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
  return (
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
            const inputValue = e.target.value.trim();

            if (inputValue === '') {
              setInputMedidaMayorA(null as null); // Usa el operador 'as' para castear a null
            } else {
              const numericValue = parseFloat(inputValue);
              if (!isNaN(numericValue)) {
                setInputMedidaMayorA(numericValue as unknown as null); // Usa el operador 'as' para castear a null
              }
            }
            }}
          value={inputMedidaMayorA || ''}
        />
      
      <Field
        component={TextField}
        label="Medida Menor A"
        name="medidaMenorA"
        type="number"
        pattern="[0-9]*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value.trim();

          if (inputValue === '') {
            setInputMedidaMenorA(null as unknown as null);
          } else {
            const numericValue = parseFloat(inputValue);
            if (!isNaN(numericValue)) {
              setInputMedidaMenorA(numericValue as unknown as null);
            }}}}
        value={inputMedidaMenorA || ''}
      />

      <br/>

      <Field
        component={TextField}
        name="medidaMayorB"
        label="Medida Mayor B"
        sx={{mt:2, mr:4}}
        type="number"
        pattern="[0-9]*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value.trim();

          if (inputValue === '') {
            setInputMedidaMayorB(null as null); // Usa el operador 'as' para castear a null
          } else {
            const numericValue = parseFloat(inputValue);
            if (!isNaN(numericValue)) {
              setInputMedidaMayorB(numericValue as unknown as null); // Usa el operador 'as' para castear a null
            }
          }
          }}
        value={inputMedidaMayorB || ''}
      />

      <Field 
        component={TextField}
        name="medidaMenorB"
        label="Medida Menor B"
        sx={{mt:2}}
        type="number"
        pattern="[0-9]*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value.trim();

          if (inputValue === '') {
            setInputMedidaMenorB(null as unknown as null);
          } else {
            const numericValue = parseFloat(inputValue);
            if (!isNaN(numericValue)) {
              setInputMedidaMenorB(numericValue as unknown as null);
            }}}}
        value={inputMedidaMenorB || ''}
      />

      <br/>

      <Field
        component={TextField}
        name="longintudDuctos"
        label="Longitud"
        sx={{mt:2, mr:4}}
        type="number"
        pattern="[0-9]*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value.trim();

          if (inputValue === '') {
            setInputLongitud(null as null); // Usa el operador 'as' para castear a null
          } else {
            const numericValue = parseFloat(inputValue);
            if (!isNaN(numericValue)) {
              setInputLongitud(numericValue as unknown as null); // Usa el operador 'as' para castear a null
            }
          }
          }}
        value={inputLongitud || ''}
      />

      <br/>

      <Field 
        component={TextField}
        name="distSoportes"
        label="Distancia Soportes"
        sx={{mt:2, mr: 4}}
        type="number"
        pattern="[0-9]*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value.trim();

          if (inputValue === '') {
            setInputDistSoportes(null as null); // Usa el operador 'as' para castear a null
          } else {
            const numericValue = parseFloat(inputValue);
            if (!isNaN(numericValue)) {
              setInputDistSoportes(numericValue as unknown as null); // Usa el operador 'as' para castear a null
            }
          }
          }}
        value={inputDistSoportes || ''}
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
        Medidas calculadas por <br/> el sistema
      </Typography>
      </div>
      <Field 
        component={TextField}
        name="promedioA"
        label="Promedio Medida A"
        // default value="0.00"
        InputProps={{readOnly: true,}}
        sx={{mt:2}}
        value={resultPromMedA}
      />

      <br/>

      <Field 
        component={TextField}
        name="promedioB"
        label="Promedio Medida B"
        default value="0.00"
        InputProps={{readOnly: true,}}
        sx={{mt:2}}
        value={resultPromMedB}
      />

      <br/>

      <Field 
        component={TextField}
        name="cantPiezas"
        label="Cantidad Piezas"
        default value="0.00"
        InputProps={{readOnly: true,}}
        sx={{mt:2}}
        value={resultCantPiezas}
      />

      <br/>

      <Field 
        component={TextField}
        name="cantSoportes"
        label="Cantidad Soportes"
        default value="0.00"
        InputProps={{readOnly: true,}}
        sx={{mt:2, mr: 2}}
        value={resultCantSoportes}
      />

      <br/>

      <Field 
        component={TextField}
        name="perimetro"
        label="Perimetro"
        default value="0.00"
        InputProps={{readOnly: true,}}
        sx={{mt:2}}
        value={resultPerimetro}
      />
      
      <br/>

      <Field 
        component={TextField}
        name="areaM2"
        label="Área M2"
        default value="0.00"
        InputProps={{readOnly: true,}}
        sx={{mt:2}}
        value={resultArea}
      />
    </div>
  </div>
  )
}
