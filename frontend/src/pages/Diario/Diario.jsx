import React, { useState } from 'react';
import { config } from '../config';
import {
  DiaryContainer,
  DiaryTitle,
  DiaryForm,
  FormGroup,
  Label,
  Input,
  TextArea,
  SubmitButton,
  LoadingSpinner,
  ErrorMessage,
  SuccessMessage
} from './styles';

function Diario() {
  const [formData, setFormData] = useState({
    data: '',
    titulo: '',
    conteudo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { routes } = config;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(routes.diario, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Entrada do diário salva com sucesso!');
        setFormData({
          data: '',
          titulo: '',
          conteudo: ''
        });
      } else {
        setError(data.message || 'Erro ao salvar entrada do diário');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DiaryContainer>
      <DiaryTitle>Diário</DiaryTitle>
      <DiaryForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="data">Data</Label>
          <Input
            type="date"
            id="data"
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="titulo">Título</Label>
          <Input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="conteudo">Conteúdo</Label>
          <TextArea
            id="conteudo"
            name="conteudo"
            value={formData.conteudo}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </SubmitButton>
      </DiaryForm>
      {loading && (
        <LoadingSpinner>
          <div>Carregando...</div>
        </LoadingSpinner>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </DiaryContainer>
  );
}

export default Diario; 