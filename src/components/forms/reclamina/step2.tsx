'use client'
import { Field } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select } from 'formik-mui';
import { useState } from 'react'
import Insumos from './Insumo';
import { useInsumosStore } from '@/context/InsumoContext';
import { useEffect } from 'react';
import { Insumo } from '@prisma/client';
import { useFormik } from 'formik';


export default function Step2() {

  // const formik = useFormik({
  //   initialValues: {
  //     cantidad: 0,
  //     precio: 0
  //   },
  //   onSubmit: values => {

  //   }
  // });

  const [ 
    insumos,
    getInsumos,
  ] = useInsumosStore(state => [
    state.insumos,
    state.getInsumos,
  ])

  const handleDelete = (id:number) => {
    setSelectedInsumos((prevInsumos) => prevInsumos.filter((insumo) => insumo.id !== id));
  };

  const [selectedInsumos, setSelectedInsumos] = useState<Insumo[]>([]);

  const handleTagChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedInsumoName = event.target.value as string;
    const selectedInsumo = insumos.find((insumo) => insumo.nomInsumo === selectedInsumoName);

    if (!selectedInsumos.includes(selectedInsumo as Insumo)) {
      setSelectedInsumos((prevSelectedInsumos) => [...prevSelectedInsumos, selectedInsumo as Insumo]);
    } else {
      setSelectedInsumos((prevSelected) =>
        prevSelected.filter((insumo) => insumo !== selectedInsumo)
      );
    }
  };

  useEffect(() => {
    getInsumos()
  }, [getInsumos])

  return (
    <div className="flex flex-col items-center">
      <div className="w-lg">
          <FormControl sx={{ minWidth: 120 }}>
            <Field
              component={Select}
              type="text"
              label="Insumos"
              name="pedidoInsumos"
              inputProps={{ name: 'Insumos', id: 'insumos' }}
              onChange={(e: any) => {
                handleTagChange(e);
              }}
              style={{width:320}}
            >
              {insumos.map((elemento, index) => (
                <MenuItem key={index} value={elemento.nomInsumo}>
                  {elemento.nomInsumo}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
        </div>
        <div>
          {selectedInsumos.map((insumo, index) => (
            <div key={index}>
              <Insumos insumoso={insumo} onDelete={() => handleDelete(insumo.id)}/>
            </div>
          ))}
        </div>
      </div>
  )
}
