import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
  :root {
    --theme-background-primary: #fff;
    --theme-font-color-primary: rgb(50 50 50);
    --theme-font-family-primary: 'Roboto';
    --theme-font-family-secondary: 'Montserrat';
    --theme-font-weight-light: 300;
    --theme-font-weight-bold: 500;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--theme-font-family-primary);
  }

  a {
    text-decoration: none;
    color: black;
  }
`;