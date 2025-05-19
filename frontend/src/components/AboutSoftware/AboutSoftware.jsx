import React from 'react';
import img1 from '@/assets/about-section/about-2.jpg';
import img2 from '@/assets/about-section/about-1.jpg';
import {
  AboutContainer,
  AboutTitle,
  AboutSubtitle,
  AboutText,
  BenefitImage,
  BenefitContainer
} from './styles';

function AboutSoftware() {
  return (
    <AboutContainer id="about">
      <div className="container-fluid py-5">
        <div className="container">
          <AboutTitle>Sobre o Software</AboutTitle>
          <AboutText>
            Nosso software foi desenvolvido especialmente para apoiar pequenos
            produtores de leite na gestão e no controle de suas produções diárias.
          </AboutText>

          {/* 1º Row */}
          <div className="row justify-content-center text-start my-5 py-lg-5">
            <div className="col-lg-5 justify-content-between align-items-center mx-3">
              <BenefitContainer>
                <BenefitImage src={img1} alt="image-about-2" />
              </BenefitContainer>
            </div>
            <div className="col-lg-5">
              <BenefitContainer>
                <AboutSubtitle>Objetivo</AboutSubtitle>
                <AboutText>
                  Com uma interface intuitiva e relatórios claros, ajudamos o
                  produtor a tomar decisões mais informadas, a aumentar a
                  produtividade e a garantir a qualidade do leite. Nosso objetivo
                  é oferecer uma solução prática e acessível que faça a tecnologia
                  trabalhar a favor do produtor, aumentando a eficiência e,
                  principalmente, a rentabilidade da produção.
                </AboutText>
              </BenefitContainer>
            </div>
          </div>

          {/* 2º row */}
          <div className="row justify-content-center text-start my-3 py-lg-5">
            <div className="col-lg-5 justify-content-between align-items-center mx-3 order-2 order-lg-1">
              <BenefitContainer>
                <AboutSubtitle>Proposta</AboutSubtitle>
                <AboutText>
                  Sabemos que o dia a dia no campo é desafiador e que cada detalhe
                  na criação de animais e na produção de leite faz a diferença.
                  Nossa ferramenta facilita o acompanhamento da saúde do rebanho,
                  o registro da quantidade de leite produzida, o controle de
                  qualidade e a análise de dados financeiros.
                </AboutText>
              </BenefitContainer>
            </div>
            <div className="col-lg-5 order-1 order-lg-2">
              <BenefitContainer>
                <BenefitImage src={img2} alt="image-about-1" />
              </BenefitContainer>
            </div>
          </div>
        </div>
      </div>
    </AboutContainer>
  );
}

export default AboutSoftware; 