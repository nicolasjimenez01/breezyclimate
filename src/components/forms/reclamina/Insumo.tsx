import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';

interface Values {
  email: string
  insumo: string;
  precio: string;
  total: string;
}

interface NeedValues {
  insumoso: string
}

const Insumo: React.FC<NeedValues> = ({insumoso}) => {
  return(
    <Formik
    initialValues={{
      email: '',
      insumo: '',
      precio: '',
      total: '', 
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
          <Field
            component={TextField}
            name="insumo"
            label="Insumo"
            sx={{mr: 4}}
            style={{width:320}}
            InputProps={{readOnly: true,}}
            value={insumoso}
          />
        
        <Field
          component={TextField}
          label="Precio unidad"
          name="precio"
          sx={{mr:4}}
          style={{width:320}}
        />

        <Field
          component={TextField}
          name="total"
          // label="Precio total"
          style={{width:320}}
          InputProps={{readOnly: true,}}
          value="Precio total"
        />
      </Form>
    )}
  </Formik>
  )
}


export default Insumo