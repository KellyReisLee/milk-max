import styled from 'styled-components';

export const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background-color: #1a237e;
  color: white;
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
`;

export const Button = styled.button`
  background-color: white;
  color: #1a237e;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FeatureCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #1a237e;
  margin-bottom: 1rem;
`;

export const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`; 