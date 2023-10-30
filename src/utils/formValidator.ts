import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Campo deve conter 3 caracteres ou mais')
    .required('Nome é obrigatório'),
  cpf: yup
    .string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .required('CPF é obrigatório'),
  phone: yup
    .string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido')
    .required('Telefone é obrigatório'),
  email: yup
    .string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
})