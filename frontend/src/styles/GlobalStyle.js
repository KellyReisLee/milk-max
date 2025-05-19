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

  /* Layout structure */
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
`;

export default GlobalStyle; 