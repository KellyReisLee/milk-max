import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 625px;

  @media (max-width: 991px) {
    width: 100%;
    max-width: 90%;
    height: 280px;
  }
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

  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    margin-top: 0px;
    margin-bottom: 12px;
  }
`;

export const Input = styled.input`
  width: 400px;
  height: 40px;
  border: 1.5px solid #b4b5b7;
  border-radius: 5px;
  padding: .375rem .75rem;

  &::placeholder {
    padding-left: 5px;
  }

  &:focus {
    outline: none;
    border-color: #1051AB;
  }

  @media (max-width: 991px) {
    width: 100%;
    max-width: 90%;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4d4b4b;
`;

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
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

export const FormTitle = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  color: #0056b3;
  font-size: 2.3rem;
  font-weight: 700;
`;

export const FormFooter = styled.div`
  margin-top: 5px;
  text-align: center;
`;

export const FormLink = styled(Link)`
  color: #1051ab;
  text-decoration: none;
  margin: 0;
  padding: 0;

  &:hover {
    text-decoration: underline;
    color: #1051ab;
  }
`; 