import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../config';
import {
  ForgotPasswordContainer,
  ForgotPasswordForm,
  Title,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  BackToLogin,
  ErrorMessage,
  SuccessMessage
} from './styles';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { routes } = config;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(routes.forgotPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.');
        setEmail('');
      } else {
        setError(data.message || 'Erro ao processar a solicitação');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordForm onSubmit={handleSubmit}>
        <Title>Esqueceu sua senha?</Title>
        <FormGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar instruções'}
        </SubmitButton>
        <BackToLogin as={Link} to="/login">
          Voltar para o login
        </BackToLogin>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </ForgotPasswordForm>
    </ForgotPasswordContainer>
  );
}

export default ForgotPassword; 