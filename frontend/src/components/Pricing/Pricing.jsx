import React from 'react';
import {
  PricingContainer,
  PricingTitle,
  PricingCard,
  PricingHeader,
  PricingName,
  PricingPrice,
  PricingPeriod,
  PricingFeatures,
  PricingFeature,
  PricingButton
} from './styles';

function Pricing() {
  return (
    <PricingContainer id="pricing">
      <div className="container">
        <PricingTitle>Planos e Preços</PricingTitle>
        <div className="row">
          {/* Plano Básico */}
          <div className="col-lg-4 col-md-6 mb-4">
            <PricingCard>
              <PricingHeader>
                <PricingName>Plano Básico</PricingName>
                <PricingPrice>
                  R$ 99,90<PricingPeriod>/mês</PricingPeriod>
                </PricingPrice>
              </PricingHeader>
              <PricingFeatures>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Gestão de até 50 vacas
                </PricingFeature>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Controle de ordenha
                </PricingFeature>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Registro de saúde básico
                </PricingFeature>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Relatórios mensais
                </PricingFeature>
              </PricingFeatures>
              <PricingButton>Começar Agora</PricingButton>
            </PricingCard>
          </div>

          {/* Plano Profissional */}
          <div className="col-lg-4 col-md-6 mb-4">
            <PricingCard>
              <PricingHeader>
                <PricingName>Plano Profissional</PricingName>
                <PricingPrice>
                  R$ 199,90<PricingPeriod>/mês</PricingPeriod>
                </PricingPrice>
              </PricingHeader>
              <PricingFeatures>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Gestão de até 200 vacas
                </PricingFeature>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Controle avançado de ordenha
                </PricingFeature>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Gestão completa de saúde
                </PricingFeature>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Análises financeiras
                </PricingFeature>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Relatórios personalizados
                </PricingFeature>
              </PricingFeatures>
              <PricingButton>Começar Agora</PricingButton>
            </PricingCard>
          </div>

          {/* Plano Empresarial */}
          <div className="col-lg-4 col-md-6 mb-4">
            <PricingCard>
              <PricingHeader>
                <PricingName>Plano Empresarial</PricingName>
                <PricingPrice>
                  R$ 399,90<PricingPeriod>/mês</PricingPeriod>
                </PricingPrice>
              </PricingHeader>
              <PricingFeatures>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Gestão ilimitada de vacas
                </PricingFeature>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Sistema completo de ordenha
                </PricingFeature>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Gestão avançada de saúde
                </PricingFeature>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Análises financeiras avançadas
                </PricingFeature>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  API de integração
                </PricingFeature>
                <PricingFeature>
                  <i className="fas fa-check"></i>
                  Suporte prioritário 24/7
                </PricingFeature>
              </PricingFeatures>
              <PricingButton>Começar Agora</PricingButton>
            </PricingCard>
          </div>
        </div>
      </div>
    </PricingContainer>
  );
}

export default Pricing; 