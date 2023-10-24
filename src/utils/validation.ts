
import * as Yup from 'yup';


export const ObraValidation = Yup.object().shape({
  nomObra: Yup.string().min(2, 'Inserta el nombre completo de la obra').max(50, 'Too Long!').required('Required'),
  nomOficial: Yup.string().min(0, 'Ingresa nombre completo').max(50, 'Too Long!').required('Required'),
  celOficial: Yup.number().typeError("Ingresa solo números").min(10, 'Número Invalido').required('Required'),
  contactoObra: Yup.string().min(0, 'Ingresa nombre completo').max(50, 'Too Long!').required('Required'),
  celContacto: Yup.number().typeError("Ingresa solo números").min(10, 'Número Invalido').required('Required'),
  ciudad: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('Required'),
  direccion: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('Required'),
});