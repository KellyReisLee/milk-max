import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { config } from '../../config';
import img1 from '../../assets/logo-reduzida-azul.png';
import img2 from '../../assets/loading.gif';
import {
  Wrapper,
  LoginContainer,
  LoginImg,
  Divisor,
  FormContainer,
  TitleForm,
  FormGroup,
  FormInput,
  FormButton,
  LoadingImg,
  Message,
  MediaQueries
} from './styles';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { routes } = config;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    setLoading(true);

    const data = {
      username: username,
      password: password
    };

    try {
      const response = await fetch(routes.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          login();
          setMessage(data.message);
          setTimeout(() => {
            navigate('/vacas');
          }, 2000);
        } else {
          setMessage(data.message);
        }
      } else {
        setMessage('Erro ao fazer login.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Ocorreu um erro ao tentar fazer login.');
    }
  };

  return (
    <MediaQueries>
      <Wrapper>
        <LoginContainer>
          <LoginImg>
            <img src={img1} alt="Logo" />
          </LoginImg>
          <Divisor />
          <FormContainer>
            <TitleForm>Log in</TitleForm>
            <p>
              Se você ainda não tem uma conta: <Link to="/signup">Registre-se</Link>
            </p>
            <form className="needs-validation" id="loginForm" onSubmit={handleSubmit} noValidate>
              <FormGroup>
                <label htmlFor="username"></label>
                <FormInput
                  id="username"
                  name="username"
                  placeholder="Nome de usuário"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <div className="valid-feedback"></div>
                <div className="invalid-feedback">Preencha o dado do usuário.</div>
              </FormGroup>
              <FormGroup>
                <label htmlFor="password"></label>
                <FormInput
                  id="password"
                  name="password"
                  placeholder="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="valid-feedback"></div>
                <div className="invalid-feedback">Preencha a senha.</div>
              </FormGroup>
              <div className="text-center mb-4">
                <p className="mt-4 mb-2 text-muted">Esqueci</p>
                <Link to="/forgot/username" className="text-muted">Usuário</Link> /
                <Link to="/forgot/password" className="text-muted">Senha</Link>
              </div>
              <FormButton type="submit">
                <strong>ENTRAR</strong>
              </FormButton>
            </form>
            {loading && (
              <div id="loading">
                <LoadingImg src={img2} alt="Carregando..." />
              </div>
            )}
            {message && (
              <Message>
                <p>{message}</p>
              </Message>
            )}
          </FormContainer>
        </LoginContainer>
      </Wrapper>
    </MediaQueries>
  );
}

export default Login; 