import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    margin: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    line-height: 1.6;
  }

  h1,
  h2,
  h3,
  button,
  a {
    font-family: "League Spartan", sans-serif;
  }

  p,
  a,
  span {
    font-family: "Open Sans", sans-serif;
  }

  nav ul {
    margin: 0;
    padding: 0;
    gap: 1.2rem;
    list-style: none;
  }

  nav ul li a {
    list-style-type: none;
    text-decoration: none;
  }

  a {
    color: #1051ab;
    text-decoration: none;
    margin: 0;
    padding: 0;
  }

  a:hover {
    text-decoration: underline;
    color: #1051ab;
  }

  /* Wrapper */
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 60vh;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  main {
    flex: 1;
  }

  /* Header Section */
  .header-container {
    background-color: #1051AB;
    padding: 1rem 0;
  }

  .btn-login {
    cursor: pointer;
  }

  .logo {
    width: 260px;
  }

  /* Para telas pequenas (sm) e médias (md) */
  @media (max-width: 991px) {
    .btn-login {
      width: 30%;
      margin-top: 1rem;
      color: #1051AB;
    }
  }

  /* Footer */
  .footer-container {
    background-color: #1051AB;
    padding: 0.8rem 0;
  }

  .subtitle-footer {
    color: #e0e0e0;
    font-size: 1.3rem;
    margin: 0;
    align-self: flex-center;
  }

  .footer-icon-list {
    display: flex;
    gap: 0.7rem;
  }

  .icon {
    background-color: #f6f6f6;
    padding: 0.4rem 0.6rem;
    border-radius: 50%;
  }

  .subscribe-container {
    display: flex;
    align-items: center;
    width: 75%;
  }

  .subscribe-input {
    flex: 1;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-right: none;
    border-radius: 4px 0 0 4px;
    outline: none;
    height: auto;
  }

  .subscribe-button {
    padding: 8px 20px;
    font-size: 16px;
    letter-spacing: 1.1px;
    border: 1px solid #007bff;
    background-color: #007bff;
    color: #ffffff;
    cursor: pointer;
    border-radius: 0 4px 4px 0;
    transition: background-color 0.3s;
  }

  .subscribe-button:hover {
    background-color: #0056b3;
  }

  .subscribe-input:focus {
    border-color: #007bff;
  }

  .hr-footer {
    background-color: #ccc;
    width: 100%;
  }

  .footer-nav ul {
    display: flex;
    padding-top: 1.5rem;
    padding-bottom: 3rem;
  }

  .nav-links-footer {
    color: #e0e0e0;
    border-right: 1px solid #e0e0e0;
    padding: 0 1.4rem;
    cursor: pointer;
  }

  .nav-links-footer a {
    color: #e0e0e0;
  }

  .copyright {
    margin: 0;
    color: #e0e0e0;
    font-size: 11px;
    margin-bottom: 0.4rem;
  }

  /* Utilitários */
  .table {
    text-align: center;
  }

  .button {
    margin-top: 50px;
  }

  .radio {
    margin: 10px 0;
    display: block;
  }

  .input-radio {
    width: 100px;
    height: 20px;
  }

  .graph {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .graph img {
    max-width: 45%;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  .btn-login {
    background-color: #1051ab;
    color: #ffffff;
    border-radius: .25rem;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    margin: 20px 0;
  }

  .btn-login:hover {
    background-color: #ffffff;
    color: #1051ab;
    border-radius: .25rem;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    margin: 20px 0;
  }

  .btn-click {
    background-color: #1051ab;
    color: #ffffff;
    border-radius: .25rem;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    margin: 20px 5px;
  }

  .btn-click:hover {
    background-color: #1051ab;
    color: #ffffff;
    border-radius: .25rem;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    margin: 20px 5px;
    text-decoration: underline;
  }

  .message {
    color: #4d4b4b;
    text-shadow: #1051AB;
  }
`;

export default GlobalStyle; 