import styled from 'styled-components';

export const SignupContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const SignupImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a237e;
  padding: 2rem;

  img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Divider = styled.div`
  width: 1px;
  background-color: #ddd;
  margin: 0 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  color: #1a237e;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease-in-out;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #1a237e;
    box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const SubmitButton = styled.button`
  background-color: #1a237e;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #283593;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;

  a {
    color: #1a237e;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export const LoadingImage = styled.img`
  width: 50px;
  height: 50px;
`;

export const Message = styled.div`
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
  background-color: ${props => props.type === 'error' ? '#ffebee' : '#e8f5e9'};
  color: ${props => props.type === 'error' ? '#c62828' : '#2e7d32'};
`;

export const ErrorText = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`; 