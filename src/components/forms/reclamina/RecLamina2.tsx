'use client'
import { Formik, Form, Field } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Select } from 'formik-mui';
import Box from '@mui/material/Box';
import { useState } from 'react'
import Insumo from './Insumo';
import Link from 'next/link';


interface Values {
  codObra: string;
  tags: []
}

const elementos = [
  'Chazo38',
  'Chazo14',
  'Chazopoli',
  'Chazoojo',
  'Varillaros38',
  'Varillaros14',
  'Waya18',
  'Grilletes',
  'Tensor9',
  'Pmecano12',
  'Pmecanodoble',
  'Angulo12',
  'Angulo2x3',
  'Orejaangulo',
  'Tor38',
  'Tor14',
  'Tuerca38',
  'Tuerca14',
  'Arandela38',
  'Arandela14',
  'Torauto',
  'Torcabeza',
  'Remachepop',
  'Stransparente',
  'Sroja',
  'Sykaflex',
  'P25',
  'Pega1714',
  'Pegapl284',
  'Jumbolon',
  'Lona',
  'Correalona',
  'Alambre18',
  'Discorte',
  'Bolsabasura'
];


export default function RecLamina2() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedTag = event.target.value as string;
    setSelectedTags((prevTags) => [...prevTags, selectedTag]);
  };

  
  return (
    <>
    <div>
      <Formik
        initialValues={{
          codObra: '',
          tags: []
        }}
          validate={(values) => {
            const errors: Partial<Values> = {};
            if (!values.codObra) {
              errors.codObra = 'Required';
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
              <div className="flex flex-col items-center">
                <div className="mb-3 w-lg">
                  <FormControl sx={{ minWidth: 120 }}>
                    <Field
                      component={Select}
                      type="text"
                      label="Insumos"
                      name="insumos"
                      inputProps={{ name: 'Insumos', id: 'insumos' }}
                      onChange={handleTagChange}
                      style={{width:320}}
                    >
                      {elementos.map((elemento, index) => (
                        <MenuItem key={index} value={elemento}>
                          {elemento}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </div>
                <div className="mb-10">
                  {selectedTags.map((tag, index) => (
                    <div key={index} className='mt-10'>
                      <Insumo insumoso={tag} />
                    </div>
                  ))}
                </div>
                <div>
                    <Link href='/pedidos/reclamina/tabla'>
                      <button
                      className="bg-menta hover:bg-mentaHover text-white color-white font-bold py-2 px-4 rounded w-60 text-xl"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Hacer pedido
                    </button>
                    </Link>
                </div>
              </div>
            </Form>
          )}
      </Formik>
    </div>
    </>
  )
}