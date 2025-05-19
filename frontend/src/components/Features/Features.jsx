import React from 'react';
import {
  FeaturesContainer,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureText
} from './styles';

function Features() {
  return (
    <FeaturesContainer id="features">
      <div className="container py-4 py-md-5">
        <div className="row py-4 py-md-5">
          {/* Card 1 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <FeatureCard>
              <div className="row justify-content-center">
                <div className="col-1 py-3 h-100 d-flex justify-content-center">
                  <FeatureTitle>
                    <FeatureIcon className="fa-solid fa-check fa-lg" />
                  </FeatureTitle>
                </div>
                <div className="col-8 ml-0">
                  <div className="card-body">
                    <FeatureTitle>Gestão de Ordenha</FeatureTitle>
                    <FeatureText>
                      Controle detalhado da ordenha, incluindo produção diária por
                      animal e qualidade do leite.
                    </FeatureText>
                  </div>
                </div>
              </div>
            </FeatureCard>
          </div>

          {/* Card 2 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <FeatureCard>
              <div className="row justify-content-center">
                <div className="col-1 py-3 h-100 d-flex justify-content-center">
                  <FeatureTitle>
                    <FeatureIcon className="fas fa-hand-holding-heart fa-lg" />
                  </FeatureTitle>
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <FeatureTitle>Gestão da Saúde</FeatureTitle>
                    <FeatureText>
                      Registre dados de saúde e vacinas de cada animal, incluindo
                      exames e tratamentos.
                    </FeatureText>
                  </div>
                </div>
              </div>
            </FeatureCard>
          </div>

          {/* Card 3 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <FeatureCard>
              <div className="row justify-content-center">
                <div className="col-1 py-3 h-100 d-flex justify-content-center">
                  <FeatureTitle>
                    <FeatureIcon className="fas fa-shield fa-lg" />
                  </FeatureTitle>
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <FeatureTitle>Alimentação e Nutrição</FeatureTitle>
                    <FeatureText>
                      Controle a alimentação e a suplementação de cada vaca.
                    </FeatureText>
                  </div>
                </div>
              </div>
            </FeatureCard>
          </div>

          {/* Card 4 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <FeatureCard>
              <div className="row justify-content-center">
                <div className="col-1 py-3 h-100 d-flex justify-content-center">
                  <FeatureTitle>
                    <FeatureIcon className="fas fa-medal fa-lg" />
                  </FeatureTitle>
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <FeatureTitle>Qualidade do Leite</FeatureTitle>
                    <FeatureText>
                      Registre e acompanhe os parâmetros de qualidade do leite,
                      como teor de gordura e proteína.
                    </FeatureText>
                  </div>
                </div>
              </div>
            </FeatureCard>
          </div>

          {/* Card 5 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <FeatureCard>
              <div className="row justify-content-center">
                <div className="col-1 py-3 h-100 d-flex justify-content-center">
                  <FeatureTitle>
                    <FeatureIcon className="fas fa-chart-line fa-lg" />
                  </FeatureTitle>
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <FeatureTitle>Análises Financeiras</FeatureTitle>
                    <FeatureText>
                      Gere relatórios financeiros e de produtividade para tomada
                      de decisão.
                    </FeatureText>
                  </div>
                </div>
              </div>
            </FeatureCard>
          </div>

          {/* Card 6 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <FeatureCard>
              <div className="row justify-content-center">
                <div className="col-1 py-3 h-100 d-flex justify-content-center">
                  <FeatureTitle>
                    <FeatureIcon className="fas fa-chart-column fa-lg" />
                  </FeatureTitle>
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <FeatureTitle>Produção Diária</FeatureTitle>
                    <FeatureText>
                      Monitore a quantidade de leite produzido diariamente por
                      cada vaca ou grupo.
                    </FeatureText>
                  </div>
                </div>
              </div>
            </FeatureCard>
          </div>
        </div>
      </div>
    </FeaturesContainer>
  );
}

export default Features; 