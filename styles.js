import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'CMU Typewriter Text', monospace;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    font-weight: 100; 
  }

  a {
    text-decoration: none; 
    color: blue;
  }
`;
