import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  FormContainer,
  FormGroup,
  Input,
  Label,
  ErrorMessage,
  SubmitButton,
  FormTitle,
  FormFooter,
  FormLink
} from './styles';

// Default validation schema
const defaultSchema = yup.object().shape({
  username: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório')
});

// Form field component
const FormField = ({ name, label, type = 'text', register, error, placeholder }) => (
  <FormGroup>
    {label && <Label htmlFor={name}>{label}</Label>}
    <Input
      id={name}
      type={type}
      placeholder={placeholder}
      {...register(name)}
    />
    {error && <ErrorMessage>{error.message}</ErrorMessage>}
  </FormGroup>
);

// Main Form component
const Form = ({
  schema = defaultSchema,
  onSubmit,
  submitText = 'ENVIAR',
  children,
  defaultValues = {}
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        {children ? (
          children({ register, errors })
        ) : (
          <>
            <FormField
              name="username"
              label="Usuário"
              register={register}
              error={errors.username}
              placeholder="Nome de usuário"
            />
            <FormField
              name="password"
              label="Senha"
              type="password"
              register={register}
              error={errors.password}
              placeholder="Senha"
            />
          </>
        )}
        <SubmitButton type="submit">
          <strong>{submitText}</strong>
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

// Common validation schemas
export const loginSchema = yup.object().shape({
  username: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório')
});

export const signupSchema = yup.object().shape({
  username: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  password: yup.string().min(6, 'Mínimo de 6 caracteres').required('Campo obrigatório'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Campo obrigatório')
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Campo obrigatório')
});

export const forgotUsernameSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório')
});

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().min(6, 'Mínimo de 6 caracteres').required('Campo obrigatório'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Campo obrigatório')
});

export const contactSchema = yup.object().shape({
  assunto: yup.string().required('Campo obrigatório'),
  nome: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  telefone: yup.string()
    .matches(/^\d{2}\s?\d{4,5}\d{4}$/, 'Formato inválido')
    .required('Campo obrigatório'),
  mensagem: yup.string().required('Campo obrigatório')
});

export default Form; 