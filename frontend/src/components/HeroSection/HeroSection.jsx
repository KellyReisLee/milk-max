import React from 'react';
import img1 from '@/assets/hero-image.jpg';
import {
  HeroContainer,
  HeroContent,
  HeroTitle,
  HeroText,
  HeroButton,
  HeroImageContainer,
  HeroImage
} from './styles';

function HeroSection() {
  return (
    <HeroContainer>
      <div className="container d-flex flex-lg-row flex-column">
        <HeroContent>
          <HeroTitle>Controle completo da sua criação, produção e do financeiro</HeroTitle>
          <HeroText>Software de gestão de criação de gado e produção leiteira, ajudando pequenos produtores no acompanhamento da produção.</HeroText>
          <HeroButton href="/cadastro">Comece Agora!</HeroButton>
          <HeroButton href="https://www.youtube.com/watch?v=jlaK1mqf2Ks">Apresentação Projeto</HeroButton>
          <HeroButton href="https://youtu.be/HrooH52G6nY">Apresentação das funcionalidades do site</HeroButton>
        </HeroContent>
        <HeroImageContainer>
          <HeroImage src={img1} alt="Hero" />
        </HeroImageContainer>
      </div>
    </HeroContainer>
  );
}

export default HeroSection; 