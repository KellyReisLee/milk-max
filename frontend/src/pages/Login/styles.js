import styled from 'styled-components';

// Estilos do wrapper (pode ser reutilizado em outras páginas)
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// Estilos específicos da página de Login
export const LoginContainer = styled.div`
  display: flex;
  margin: 10px;
`;

export const LoginImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 625px;

  img {
    height: 450px;
    width: 400px;
  }
`;

export const Divisor = styled.div`
  margin: 0;
  padding: 0;
  width: 1px;
  height: 500px;
  background-color: #e0e0e0;
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
`;

export const TitleForm = styled.h2`
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

  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    margin-top: 0px;
    margin-bottom: 12px;
  }
`;

export const FormInput = styled.input`
  width: 400px;
  height: 40px;
  border: 1.5px solid #b4b5b7;
  border-radius: 5px;
  padding: .375rem .75rem;

  &::placeholder {
    padding-left: 5px;
  }
`;

export const FormButton = styled.button`
  width: 400px;
  height: 45px;
  border: none;
  border-radius: 5px;
  background-color: #1051AB;
  color: white;
  transition: transform 0.3s ease;

  &:hover {
    background-color: #5279ae;
    transform: scale(1.03);
  }
`;

export const LoadingImg = styled.img`
  height: 100px;
  width: 100px;
`;

export const Message = styled.div`
  color: #4d4b4b;
  text-shadow: #1051AB;
  margin-top: 1rem;
`;

// Media queries para telas pequenas e médias
export const MediaQueries = styled.div`
  @media (max-width: 991px) {
    ${LoginContainer} {
      flex-direction: column;
      align-items: center;
      margin: 20px;
    }

    ${LoginImg} {
      width: 100%;
      max-width: 150px;
      height: auto;
      margin-bottom: 20px;

      img {
        width: 100%;
        height: auto;
      }
    }

    ${FormContainer} {
      width: 100%;
      max-width: 90%;
      height: 280px;
    }

    ${Divisor} {
      display: none;
    }

    ${FormInput}, ${FormButton} {
      width: 100%;
      max-width: 90%;
    }

    ${FormContainer} p {
      text-align: center;
    }
  }
`; 