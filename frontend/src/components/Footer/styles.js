import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  background-color: #1051AB;
  color: white;
  padding: 4rem 0 1rem;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FooterTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

export const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: block;
  transition: color 0.2s;

  &:hover {
    color: #f0f0f0;
  }
`;

export const FooterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FooterInput = styled.input`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  flex: 1;
  min-width: 0;

  &:focus {
    outline: none;
  }
`;

export const FooterButton = styled.button`
  background-color: white;
  color: #1051AB;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

export const FooterSocial = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SocialIcon = styled.a`
  color: white;
  font-size: 1.25rem;
  transition: color 0.2s;

  &:hover {
    color: #f0f0f0;
  }
`;

export const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
`; 