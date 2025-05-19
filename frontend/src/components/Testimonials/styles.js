import styled from 'styled-components';

export const TestimonialsContainer = styled.section`
  background-color: #e7f2ff;
  padding: 3rem 0;
`;

export const TestimonialsTitle = styled.h2`
  font-size: 2em;
  margin-bottom: 1em;
  color: #0056b3;
`;

export const TestimonialCard = styled.div`
  background: #fff;
  border-radius: 8px;
  color: #555;
  padding: 1rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  text-align: start;
`;

export const TestimonialHeader = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const TestimonialImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #007bff;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TestimonialName = styled.h5`
  margin: 0;
  color: #007bff;
`;

export const TestimonialTwitter = styled.p`
  color: #abacad;
  font-size: 0.78rem;
  margin: 0;
`;

export const TestimonialContent = styled.p`
  font-size: 0.87rem;
  color: #6a6a6b;
  font-style: italic;
  letter-spacing: 0.8px;
`;

export const TestimonialFooter = styled.p`
  color: #a7a7a7;
  font-size: 0.8rem;
  margin: 0;
`; 