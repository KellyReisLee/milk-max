import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { config } from '../../config';
import img1 from '@/assets/logo-reduzida-azul.png';
import img2 from '@/assets/loading.gif';
import {
  LoginContainer,
  LoginImage,
  Divider,
  FormContainer,
  Title,
  FormGroup,
  Input,
  SubmitButton,
  ForgotLinks,
  LoadingContainer,
  LoadingImage,
  Message,
  ErrorText
} from './styles';

// Schema de validação
const schema = yup.object().shape({
  username: yup.string().required('Nome de usuário é obrigatório'),
  password: yup.string().required('Senha é obrigatória')
});

function Login() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { routes } = config;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(routes.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      const responseData = await response.json();

      if (response.ok) {
        if (responseData.success) {
          login();
          setMessage(responseData.message);
          setTimeout(() => {
            navigate('/vacas');
          }, 2000);
        } else {
          setMessage(responseData.message);
        }
      } else {
        setMessage('Erro ao fazer login.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Ocorreu um erro ao tentar fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <LoginContainer>
        <LoginImage>
          <img src={img1} alt="Logo" />
        </LoginImage>
        <Divider />
        <FormContainer>
          <Title>Log in</Title>
          <p>
            Se você ainda não tem uma conta: <Link to="/signup">Registre-se</Link>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Input
                placeholder="Nome de usuário"
                type="text"
                {...register('username')}
              />
              {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
            </FormGroup>
            <FormGroup>
              <Input
                placeholder="Senha"
                type="password"
                {...register('password')}
              />
              {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
            </FormGroup>
            <ForgotLinks>
              <p>Esqueci</p>
              <Link to="/forgot/username">Usuário</Link> /
              <Link to="/forgot/password">Senha</Link>
            </ForgotLinks>
            <SubmitButton type="submit">
              <strong>ENTRAR</strong>
            </SubmitButton>
          </form>
          {loading && (
            <LoadingContainer>
              <LoadingImage src={img2} alt="Carregando..." />
            </LoadingContainer>
          )}
          {message && (
            <Message>
              <p>{message}</p>
            </Message>
          )}
        </FormContainer>
      </LoginContainer>
    </div>
  );
}

export default Login; 