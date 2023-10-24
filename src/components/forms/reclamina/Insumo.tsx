import { Insumo } from '@prisma/client';
import { Formik, Form, Field, useFormik } from 'formik';
import { TextField } from 'formik-mui';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { usePromMedA, usePromedioPerimetro, useCantPiezas, useArea, useCantSoportes, useDistSoportes } from './operations';
import { useEffect } from 'react';
import { operacionesPorInsumo } from './calculadoras';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useInsumosStore } from '@/context/InsumoContext';
interface Values {
  cantidad: string;
  precio: string;
  total: string;
}

interface NeedValues {
  insumoso: Insumo;
  onDelete: () => void
}

const Insumos: React.FC<NeedValues> = ({insumoso, onDelete}: NeedValues) => {

  const [ 
    selectedPedidoInsumos,
    setSelectedPedidoInsumo
  ] = useInsumosStore(state => [
    state.selectedPedidoInsumos,
    state.setSelectedPedidoInsumo
  ])

  

  const cantSoportes = useCantSoportes();
  const [inputDistSoportes, _] = useDistSoportes()
  const cantPiezas = useCantPiezas()
  const promedioPerimetro = usePromedioPerimetro()
  const area = useArea()
  const promedioMedA = usePromMedA()

  const handleDelete = () => {

  }

  const formik = useFormik({
    initialValues: {
      cantidad: '',
      total: '',
      // ...otras propiedades iniciales según tus necesidades
    },
    onSubmit: values => {
      // Esta función se ejecutará cuando el formulario se envíe
      // Puedes dejarlo vacío o manejar lógica adicional aquí
    },
    // ...otros atributos y funciones necesarios para Formik
  });

  const info = async () => {
    const newInsumoData = {
      cantidad: Number(formik.values.cantidad),
      precio: Number(insumoso.precio),
      total: Number(formik.values.total),
      insumoId: Number(insumoso.id),
    };

    await setSelectedPedidoInsumo(newInsumoData);
  };

  

  useEffect(() => {
    // Realizar cálculos iniciales cuando el componente se renderiza
    if (insumoso.nomInsumo && operacionesPorInsumo[insumoso.nomInsumo]) {
      operacionesPorInsumo[insumoso.nomInsumo](cantSoportes, insumoso, formik, inputDistSoportes, cantPiezas, promedioPerimetro, area, promedioMedA);
    }
    
  }, [insumoso, area, cantPiezas, cantSoportes, inputDistSoportes, promedioMedA, promedioPerimetro, onDelete]);

  useEffect(() => {
    info()
  }, [ insumoso.id])

  return(
    <Box textAlign="center" p={1} className="border-solid border border-gray-300 mt-3 rounded-md">
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box textAlign="center" >
          <Typography variant="h6">{insumoso.nomInsumo}</Typography>
        </Box>
        <Tooltip title="Eliminar" placement="top-end" className='mx-3'>
          <Button onClick={() => onDelete()}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Button>
        </Tooltip>
      </Box>
      
      <Box mt={2}>
        
        <Formik
          initialValues={{
            cantidad: '',
            precio: '',
            total: '',
          }}
          validate={(values) => {
            const errors = {};
            // Add your validation logic here
            return errors;
          }}
          onSubmit={(values, { setSubmitting, setValues }) => {
            setTimeout(() => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }}
        >
          {({ setValues, values }) => (
            <Form>
              <Field
                component={TextField}
                label="Cantidad"
                sx={{ mr: 4 }}
                style={{ width: 320 }}
                InputProps={{ readOnly: true}}
                {...formik.getFieldProps('cantidad')}
                
              />

              <Field
                component={TextField}
                label="Precio unidad"
                name="precio"
                sx={{ mr: 4 }}
                style={{ width: 320 }}
                InputProps={{ readOnly: true }}
                value={insumoso.precio}
              />

              <Field
                component={TextField}
                
                label="Precio total"
                style={{ width: 320 }}
                InputProps={{ readOnly: true }}
                // value={values.total}
                {...formik.getFieldProps('total')}
              />
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}


export default Insumos