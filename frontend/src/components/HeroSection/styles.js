import styled from 'styled-components';

export const HeroContainer = styled.section`
  padding: 5rem 0;
  background-color: #f8f9fa;
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  padding: 1.25rem;
  text-align: center;

  @media (min-width: 992px) {
    text-align: start;
    justify-content: flex-start;
    order: 1;
  }
`;

export const HeroTitle = styled.h1`
  color: #0056b3;
  font-size: 2.3rem;
`;

export const HeroText = styled.p`
  color: rgb(116, 115, 115);
  font-size: 0.96rem;
  letter-spacing: 0.8px;
  margin-top: 1rem;
`;

export const HeroButton = styled.a`
  background-color: #0056b3;
  font-weight: 700;
  letter-spacing: 1px;
  border: 2px solid #0056b3;
  padding: 0.6rem 2.4rem;
  border-radius: 5px;
  transition: transform 0.3s ease;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 2rem;
  color: #ffffff;
  text-decoration: none;
  width: 75%;
  text-align: center;

  &:hover {
    background-color: #ffffff;
    color: #0056b3;
    border: 2px solid #0056b3;
    text-decoration: none;
  }

  @media (min-width: 992px) {
    align-self: flex-start;
  }
`;

export const HeroImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 992px) {
    order: 2;
  }
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`; 