import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Insumo } from '@prisma/client';
import { Formik, Form, Field } from 'formik';
import { useInsumosStore } from '@/context/InsumoContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import { TextField } from 'formik-mui';
import { LinearProgress } from '@mui/material';

interface Modal {
  isOpen: boolean
  onClose: () => void;
  insumo: Insumo
}

export default function EditInsumoDialog({ isOpen, onClose, insumo }: Modal) {

  const updateInsumo = useInsumosStore(state => state.updateInsumo)
  const router = useRouter()

  // console.log(insumo.id)

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ mb: 2}}>
          {'Editar insumo'}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', mt: '20px', display: 'flex' }}>
          <div className='mx-auto flex flex-wrap'>
          <Formik
            initialValues={insumo}

            enableReinitialize={true}
            // validate={(values) => {
            //   const errors: Partial<Values> = {};
            //   if (!values.email) {
            //     errors.email = 'Required';
            //   } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            //   ) {
            //     errors.email = 'Invalid email address';
            //   }
            //   return errors;
            // }}
            onSubmit={async (e, { setSubmitting }) => {
              try {
                await updateInsumo(insumo.id , {
                  nomInsumo: e.nomInsumo,
                  proveedor: e.proveedor,
                  cantStock: Number(e.cantStock),
                  precio: Number(e.precio),
                });
                toast.success('Insumo Actualizado');
                await new Promise((resolve) => setTimeout(resolve, 2000))
                onClose()
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
                  label="Nombre Insumo"
                  name="nomInsumo"
                  style={{width:320}}
                  InputProps={{readOnly: true,}}
                >{insumo.nomInsumo}</Field>

                <Field
                  component={TextField}
                  name="proveedor"
                  label="Proveedor"
                  sx={{mt:2, mr:4}}
                  style={{width:320}}
                >{insumo.proveedor}</Field>

                <br/>

                <Field 
                  component={TextField}
                  name="cantStock"
                  label="Stock"
                  sx={{mt:2}}
                  style={{width:320}}
                >{insumo.cantStock}</Field>

                <Field
                  component={TextField}
                  name="precio"
                  label="Precio"
                  sx={{mt:2, mr:4}}
                  style={{width:320}}
                >{insumo.precio}</Field>


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
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={() => { onEliminar(); onClose(); }}>Guardar</Button>
          <Button onClick={onClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}