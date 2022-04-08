import {object, ref, string} from 'yup';

export const loginSchema = object({
  username: string().required('Username is required'),
  password: string().required('Password is required'),
});

export const registerSchema = object({
  first_name: string().required('Firstname is required'),
  last_name: string().required('Lastname is required'),
  username: string().required('Username is required'),
  email: string().email('E-mail is not valid!').required('Email is required'),
  password: string()
    .required('Password is required')
    .min(8, 'Password has to be longer than 7 characters!'),
  password2: string()
    .required('Password is required')
    .min(8, 'Password has to be longer than 7 characters!')
    .oneOf([ref('password'), null], 'Passwords must match'),
});
