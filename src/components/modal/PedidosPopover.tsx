import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardWithLink from '../cards';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface Values {
  codObra: string;
}

interface Modal {
  isOpen: boolean
  onClose: () => void;
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #d4d4d4',
  boxShadow: 24,
  p: 4,
};

const codigosDeObra = [
  '001',
  '002',
  '003',
  '004',
  '125',
]
 
const DialogWithForm = ({ isOpen, onClose }: Modal) => {

  const router = useRouter()

  const customSvg = (<svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.55718 21.5574H4.75717C3.43168 21.5574 2.35717 20.4828 2.35718 19.1574L2.35727 4.75741C2.35728 3.43193 3.43179 2.35742 4.75727 2.35742H15.5575C16.883 2.35742 17.9575 3.43194 17.9575 4.75742V9.55742M6.55755 7.15742H13.7576M6.55755 10.7574H13.7576M6.55755 14.3574H10.1576M13.1574 18.2484L18.2485 13.1573L21.6427 16.5514L16.5515 21.6426H13.1574V18.2484Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>)

  const footerSvg = (            <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
    />
  </svg>)

  const handleSubmit = (values: Values, { setSubmitting }: any) => {
    const codigoIngresado = values.codObra;
    const codigoExiste = codigosDeObra.includes(codigoIngresado);

    if (codigoExiste) {
      router.push('/pedidos/crear/reclamina/insertar');
    } else {
      toast.error('El código de obra no existe', {position: 'top-center',});
    }

    setSubmitting(false);
  };

 
  return (
    <>
      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        {/* <Fade in={open}> */}
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" className='mb-3'>
              Ingresa el código de obra
            </Typography>
            <div className='flex flex-col items-center justify justify-center'>
            <Formik
              initialValues={{
                codObra: '',
              }}
              validate={(values) => {
                const errors: Partial<Values> = {};
                if (!values.codObra) {
                  errors.codObra = 'Required';
                }
                return errors;
              }}
              onSubmit={handleSubmit}
            >
              {({ submitForm, isSubmitting }) => (
                <Form>
                  <Field
                  component={TextField}
                  name="codObra"
                  label="Código de obra"
                  type="string"
                  pattern="[0-9]*"
                  />
                  <br />
                  {isSubmitting }
                  <br />
                  <button className="bg-menta hover:bg-mentaHover text-white color-white font-bold py-2 px-4 rounded w-40 text-xl ml-8" 
                  disabled={isSubmitting}
                  onClick={submitForm} >
                    Buscar
                  </button>
                </Form>
              )}
          </Formik>
            </div>
          </Box>
        {/* </Fade> */}
      </Modal>
      </div>
    </>
  );
}


export default DialogWithForm