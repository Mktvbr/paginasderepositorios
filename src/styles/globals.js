import { createGlobalStyle } from "styled-components";

//cria com o styled-components o estilo padrão para todos os componentes
export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;

    }

    html, body, #root{
        min-height: 100vh;
    }

    body{
        background: #0D2636;
        font-size: 14px;
        -webkit-font-smoothing: antialiased !important;
    }

    body, input, button{
        color: #222;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
    }

    button{
    cursor: pointer;
    }
`   