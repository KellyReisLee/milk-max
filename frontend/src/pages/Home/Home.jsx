import React from 'react';
import { Link } from 'react-router-dom';
import {
  HomeContainer,
  HeroSection,
  Title,
  Subtitle,
  Button,
  FeaturesSection,
  FeatureCard,
  FeatureTitle,
  FeatureDescription
} from './styles';

function Home() {
  return (
    <HomeContainer>
      <HeroSection>
        <Title>MilkMax</Title>
        <Subtitle>Gerencie sua produção leiteira de forma eficiente</Subtitle>
        <Link to="/login">
          <Button>Começar Agora</Button>
        </Link>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureTitle>Controle de Produção</FeatureTitle>
          <FeatureDescription>
            Acompanhe a produção diária de leite de cada vaca com métricas precisas.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Monitoramento de Saúde</FeatureTitle>
          <FeatureDescription>
            Registre e monitore a saúde das suas vacas com indicadores importantes.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Relatórios Detalhados</FeatureTitle>
          <FeatureDescription>
            Gere relatórios completos para análise e tomada de decisões.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>
    </HomeContainer>
  );
}

export default Home; 