import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
      
        box-sizing: border-box;
        
    }
    html, body {
        background-color: black;
        font-family: 'Press Start 2P', cursive;
        text-align: center;
    
    }   

`;

export default GlobalStyles;
