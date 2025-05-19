import styled from 'styled-components';

export const RedefSenhaContainer = styled.div`
  display: flex;
  margin: 10px;
`;

export const RedefSenhaImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 625px;

  img {
    height: 450px;
    width: 400px;
  }

  @media (max-width: 991px) {
    width: 100%;
    max-width: 150px;
    height: auto;
    margin-bottom: 20px;
  }
`;

export const Divider = styled.div`
  margin: 0;
  padding: 0;
  width: 1px;
  height: 500px;
  background-color: #e0e0e0;

  @media (max-width: 991px) {
    display: none;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 625px;

  p {
    margin-top: 5px;
  }

  @media (max-width: 991px) {
    width: 100%;
    max-width: 90%;
    height: 280px;
  }
`;

export const Title = styled.h2`
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

  &:nth-child(1) {
    margin-top: 20px;
    margin-bottom: 12px;
  }

  &:nth-child(2) {
    margin-top: 0px;
    margin-bottom: 12px;
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

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
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