import styled from 'styled-components';

export const PricingContainer = styled.section`
  padding: 5rem 0;
  background-color: #f8f9fa;
`;

export const PricingTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
  text-align: center;
`;

export const PricingCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const PricingHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const PricingName = styled.h3`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const PricingPrice = styled.div`
  font-size: 2.5rem;
  color: #3498db;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const PricingPeriod = styled.span`
  font-size: 1rem;
  color: #7f8c8d;
`;

export const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

export const PricingFeature = styled.li`
  padding: 0.5rem 0;
  color: #34495e;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    color: #2ecc71;
  }
`;

export const PricingButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`; 