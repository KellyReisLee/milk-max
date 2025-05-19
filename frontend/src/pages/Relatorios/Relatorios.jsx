import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img2 from '@/assets/loading.gif';
import {
  ReportsContainer,
  ReportsTitle,
  ReportsGrid,
  ReportCard,
  ReportTitle,
  ReportDescription,
  ReportButton,
  LoadingContainer,
  LoadingImage,
  ErrorMessage,
  SuccessMessage,
  FilterContainer,
  FilterSelect,
  DateRangeContainer,
  DateInput,
  FilterButton
} from './styles';

function Relatorios() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedFarm, setSelectedFarm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const reports = [
    {
      id: 1,
      title: 'Produção de Leite',
      description: 'Relatório detalhado da produção de leite por período, incluindo volume, qualidade e tendências.',
      path: '/relatorios/producao-leite'
    },
    {
      id: 2,
      title: 'Saúde do Rebanho',
      description: 'Análise da saúde do rebanho, incluindo vacinações, tratamentos e incidência de doenças.',
      path: '/relatorios/saude-rebanho'
    },
    {
      id: 3,
      title: 'Reprodução',
      description: 'Relatório de reprodução com dados de inseminação, gestação e nascimentos.',
      path: '/relatorios/reproducao'
    },
    {
      id: 4,
      title: 'Alimentação',
      description: 'Análise do consumo de ração, suplementos e custos relacionados à alimentação.',
      path: '/relatorios/alimentacao'
    },
    {
      id: 5,
      title: 'Financeiro',
      description: 'Relatório financeiro com receitas, despesas e indicadores de rentabilidade.',
      path: '/relatorios/financeiro'
    }
  ];

  const handleReportClick = (path) => {
    navigate(path, {
      state: {
        farm: selectedFarm,
        startDate,
        endDate
      }
    });
  };

  const handleFilter = () => {
    if (!selectedFarm) {
      setError('Por favor, selecione uma fazenda');
      return;
    }
    setError('');
    setSuccess('Filtros aplicados com sucesso');
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingImage src={img2} alt="Carregando..." />
      </LoadingContainer>
    );
  }

  return (
    <ReportsContainer>
      <ReportsTitle>Relatórios</ReportsTitle>

      <FilterContainer>
        <FilterSelect
          value={selectedFarm}
          onChange={(e) => setSelectedFarm(e.target.value)}
        >
          <option value="">Selecione uma fazenda</option>
          <option value="fazenda1">Fazenda 1</option>
          <option value="fazenda2">Fazenda 2</option>
        </FilterSelect>

        <DateRangeContainer>
          <DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>até</span>
          <DateInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </DateRangeContainer>

        <FilterButton onClick={handleFilter}>
          Aplicar Filtros
        </FilterButton>
      </FilterContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <ReportsGrid>
        {reports.map((report) => (
          <ReportCard key={report.id}>
            <ReportTitle>{report.title}</ReportTitle>
            <ReportDescription>{report.description}</ReportDescription>
            <ReportButton
              onClick={() => handleReportClick(report.path)}
              disabled={!selectedFarm}
            >
              Gerar Relatório
            </ReportButton>
          </ReportCard>
        ))}
      </ReportsGrid>
    </ReportsContainer>
  );
}

export default Relatorios; 