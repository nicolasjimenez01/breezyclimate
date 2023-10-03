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
 
const DialogWithForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter()

  const handleSubmit = (values: Values, { setSubmitting }: any) => {
    const codigoIngresado = values.codObra;
    const codigoExiste = codigosDeObra.includes(codigoIngresado);

    if (codigoExiste) {
      router.push('/pedidos/reclamina/insertar');
    } else {
      toast.error('El código de obra no existe', {position: 'top-center',});
    }

    setSubmitting(false);
  };

 
  return (
    <>
      <div>
      <CardWithLink title="Insertar" text="Aquí puedes insertar un nuevo pedido para una obra" accion="Insertar pedido" onClick={handleOpen}/>
      </div>
      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
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
        </Fade>
      </Modal>
    </div>
    

    </>
  );
}


export default DialogWithForm