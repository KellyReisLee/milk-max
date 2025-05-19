import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import img1 from '@/assets/logo-reduzida-azul.png';
import img2 from '@/assets/loading.gif';
import {
  RedefSenhaContainer,
  RedefSenhaImage,
  Divider,
  FormContainer,
  Title,
  FormGroup,
  Input,
  SubmitButton,
  LoadingContainer,
  LoadingImage,
  Message,
  ErrorText
} from './styles';

// Schema de validação
const schema = yup.object().shape({
  password: yup.string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: yup.string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
});

function RedefSenha() {
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
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/redefinir-senha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: data.password
        })
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage({ text: 'Senha redefinida com sucesso!', type: 'success' });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage({ text: responseData.message || 'Erro ao redefinir senha', type: 'error' });
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
    <RedefSenhaContainer>
      <RedefSenhaImage>
        <img src={img1} alt="Logo" />
      </RedefSenhaImage>
      <Divider />
      <FormContainer>
        <Title>Redefinir Senha</Title>
        {message.text && <Message type={message.type}>{message.text}</Message>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Input
              type="password"
              placeholder="Nova senha"
              {...register('password')}
            />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Input
              type="password"
              placeholder="Confirmar nova senha"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
          </FormGroup>

          <SubmitButton type="submit">
            Redefinir Senha
          </SubmitButton>
        </form>
      </FormContainer>
    </RedefSenhaContainer>
  );
}

export default RedefSenha; 