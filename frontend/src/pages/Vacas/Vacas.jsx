import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img2 from '@/assets/loading.gif';
import {
  CowsContainer,
  CowsHeader,
  Title,
  AddButton,
  SearchContainer,
  SearchInput,
  FilterSelect,
  CowsGrid,
  CowCard,
  CowHeader,
  CowName,
  CowStatus,
  CowInfo,
  InfoRow,
  InfoLabel,
  CowActions,
  ActionButton,
  LoadingContainer,
  LoadingImage,
  ErrorMessage,
  SuccessMessage
} from './styles';

function Vacas() {
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCows();
  }, []);

  const fetchCows = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cows`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setCows(data);
      } else {
        setError('Erro ao carregar dados das vacas');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta vaca?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cows/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setSuccess('Vaca excluída com sucesso');
        setCows(cows.filter(cow => cow.id !== id));
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Erro ao excluir vaca');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor');
    }
  };

  const filteredCows = cows.filter(cow => {
    const matchesSearch = cow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cow.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingImage src={img2} alt="Carregando..." />
      </LoadingContainer>
    );
  }

  return (
    <CowsContainer>
      <CowsHeader>
        <Title>Gerenciamento de Vacas</Title>
        <AddButton onClick={() => navigate('/vacas/nova')}>
          <span>+</span> Nova Vaca
        </AddButton>
      </CowsHeader>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Buscar por nome ou raça..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos os Status</option>
          <option value="active">Ativas</option>
          <option value="inactive">Inativas</option>
        </FilterSelect>
      </SearchContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <CowsGrid>
        {filteredCows.map(cow => (
          <CowCard key={cow.id}>
            <CowHeader>
              <CowName>{cow.name}</CowName>
              <CowStatus status={cow.status}>
                {cow.status === 'active' ? 'Ativa' : 'Inativa'}
              </CowStatus>
            </CowHeader>
            <CowInfo>
              <InfoRow>
                <InfoLabel>Raça:</InfoLabel>
                <span>{cow.breed}</span>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Idade:</InfoLabel>
                <span>{cow.age} anos</span>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Produção:</InfoLabel>
                <span>{cow.production}L/dia</span>
              </InfoRow>
            </CowInfo>
            <CowActions>
              <ActionButton
                variant="edit"
                onClick={() => navigate(`/vacas/editar/${cow.id}`)}
              >
                Editar
              </ActionButton>
              <ActionButton
                variant="delete"
                onClick={() => handleDelete(cow.id)}
              >
                Excluir
              </ActionButton>
            </CowActions>
          </CowCard>
        ))}
      </CowsGrid>
    </CowsContainer>
  );
}

export default Vacas; 