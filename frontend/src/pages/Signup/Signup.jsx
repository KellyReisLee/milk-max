import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '@/assets/logo-reduzida-azul.png';
import img2 from '@/assets/loading.gif';
import {
  SignupContainer,
  SignupImage,
  Divider,
  FormContainer,
  Title,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  LoginLink,
  LoadingContainer,
  LoadingImage,
  Message,
  ErrorText
} from './styles';

// Schema de validação
const schema = yup.object().shape({
  name: yup.string()
    .required('Nome é obrigatório')
    .matches(/^\S+\s+\S+.*$/, 'Nome completo é obrigatório'),
  email: yup.string()
    .required('Email é obrigatório')
    .email('Email inválido'),
  username: yup.string()
    .required('Nome de usuário é obrigatório')
    .min(3, 'Nome de usuário deve ter no mínimo 3 caracteres'),
  password: yup.string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: yup.string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
});

function Signup() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          username: data.username,
          password: data.password
        })
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage({ text: 'Cadastro realizado com sucesso!', type: 'success' });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage({ text: responseData.message || 'Erro ao realizar cadastro', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Erro ao conectar com o servidor', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingImage src={img2} alt="Carregando..." />
      </LoadingContainer>
    );
  }

  return (
    <SignupContainer>
      <SignupImage>
        <img src={img1} alt="Logo" />
      </SignupImage>
      <Divider />
      <FormContainer>
        <Title>Criar Conta</Title>
        {message.text && <Message type={message.type}>{message.text}</Message>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              type="text"
              id="name"
              {...register('name')}
            />
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              id="email"
              {...register('email')}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="username">Nome de Usuário</Label>
            <Input
              type="text"
              id="username"
              {...register('username')}
            />
            {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              {...register('password')}
            />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
          </FormGroup>

          <SubmitButton type="submit">
            Cadastrar
          </SubmitButton>
        </form>
        <LoginLink>
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </LoginLink>
      </FormContainer>
    </SignupContainer>
  );
}

export default Signup; 