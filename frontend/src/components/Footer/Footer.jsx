import React from 'react';
import { Link } from 'react-router-dom';
import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterText,
  FooterLink,
  FooterForm,
  FooterInput,
  FooterButton,
  FooterBottom,
  FooterSocial,
  SocialIcon,
  Copyright
} from './styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>MilkMax</FooterTitle>
          <FooterText>
            Soluções inteligentes para gestão de produção leiteira
          </FooterText>
          <FooterSocial>
            <SocialIcon href="#" target="_blank">
              <i className="fab fa-facebook-f"></i>
            </SocialIcon>
            <SocialIcon href="#" target="_blank">
              <i className="fab fa-instagram"></i>
            </SocialIcon>
            <SocialIcon href="#" target="_blank">
              <i className="fab fa-linkedin-in"></i>
            </SocialIcon>
          </FooterSocial>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Receba novidades</FooterTitle>
          <FooterText>
            Inscreva-se para receber atualizações sobre novos recursos e melhorias
          </FooterText>
          <FooterForm>
            <FooterInput type="email" placeholder="Seu e-mail" />
            <FooterButton type="submit">Inscrever</FooterButton>
          </FooterForm>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Links Rápidos</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/sobre">Sobre</FooterLink>
          <FooterLink to="/contato">Contato</FooterLink>
          <FooterLink to="/login">Login</FooterLink>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          &copy; {new Date().getFullYear()} MilkMax. Todos os direitos reservados.
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 