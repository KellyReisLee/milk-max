import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { config } from '../config';
import img1 from '@/assets/loading.gif';
import {
  ContactContainer,
  ContactFormContainer,
  ContactTitle,
  FormGroup,
  Input,
  TextArea,
  SubmitButton,
  LoadingImage,
  Message,
  ErrorText
} from './styles';

// Schema de validação
const schema = yup.object().shape({
  assunto: yup.string().required('Assunto é obrigatório'),
  nome: yup.string()
    .required('Nome é obrigatório')
    .matches(/^\S+\s+\S+.*$/, 'Nome completo é obrigatório'),
  email: yup.string()
    .required('Email é obrigatório')
    .email('Email inválido'),
  telefone: yup.string()
    .required('Telefone é obrigatório')
    .matches(/^\d{2}\s?\d{4,5}\d{4}$/, 'Formato inválido (XX) XXXXX-XXXX'),
  mensagem: yup.string().required('Mensagem é obrigatória')
});

function Contato() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { routes } = config;

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(routes.contato, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      const responseData = await response.json();
      
      if (response.ok) {
        setMessage(responseData.message);
        reset(); // Limpa o formulário após envio bem-sucedido
      } else {
        setMessage(responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Ocorreu um erro ao tentar enviar o e-mail.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContainer>
      <ContactFormContainer>
        <ContactTitle>ENTRE EM CONTATO</ContactTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Assunto"
              {...register('assunto')}
            />
            {errors.assunto && <ErrorText>{errors.assunto.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Input
              type="text"
              placeholder="Nome Completo"
              {...register('nome')}
            />
            {errors.nome && <ErrorText>{errors.nome.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Input
              type="email"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Input
              type="tel"
              placeholder="Telefone (XX) XXXXX-XXXX"
              {...register('telefone')}
            />
            {errors.telefone && <ErrorText>{errors.telefone.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <TextArea
              rows="5"
              placeholder="Mensagem"
              {...register('mensagem')}
            />
            {errors.mensagem && <ErrorText>{errors.mensagem.message}</ErrorText>}
          </FormGroup>

          <SubmitButton type="submit">
            <strong>ENVIAR</strong>
          </SubmitButton>
        </form>

        {loading && (
          <div id="loading">
            <LoadingImage src={img1} alt="Carregando..." />
          </div>
        )}

        {message && (
          <Message>
            <p>{message}</p>
          </Message>
        )}
      </ContactFormContainer>
    </ContactContainer>
  );
}

export default Contato; 