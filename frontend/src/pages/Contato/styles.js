import styled from 'styled-components';

export const ContactContainer = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

export const ContactFormContainer = styled.div`
  margin-bottom: 70px;
`;

export const ContactTitle = styled.h1`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  color: #0056b3;
  font-size: 2.3rem;
  font-weight: 700;
`;

export const FormGroup = styled.div`
  margin-bottom: 25px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

export const Input = styled.input`
  width: 400px;
  height: 40px;
  border: 1.5px solid #b4b5b7;
  border-radius: 5px;
  padding: 0.375rem 0.75rem;

  &::placeholder {
    padding-left: 5px;
  }

  @media (max-width: 991px) {
    width: 100%;
    max-width: 90%;
  }
`;

export const TextArea = styled.textarea`
  width: 400px;
  border: 1.5px solid #b4b5b7;
  border-radius: 5px;

  @media (max-width: 991px) {
    width: 100%;
    max-width: 90%;
  }
`;

export const SubmitButton = styled.button`
  width: 400px;
  height: 45px;
  border: none;
  border-radius: 5px;
  background-color: #1051AB;
  color: white;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
    background-color: #5279ae;
  }

  @media (max-width: 991px) {
    width: 100%;
    max-width: 90%;
  }
`;

export const LoadingImage = styled.img`
  height: 100px;
  width: 100px;
`;

export const Message = styled.div`
  color: #4d4b4b;
  text-shadow: #1051AB;
  margin-top: 1rem;
`;

export const ErrorText = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`; 