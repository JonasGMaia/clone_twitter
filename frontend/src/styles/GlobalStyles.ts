    // src/styles/GlobalStyles.ts
    import { createGlobalStyle } from 'styled-components';

    export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.text};
        font-family: 'Courier New', Courier, monospace; /* Tipografia monoespaçada para o toque retrô, pode trocar se preferir */
        -webkit-font-smoothing: antialiased;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        cursor: pointer;
        font-family: inherit;
        border: ${(props) => props.theme.borders.thickness} solid ${(props) => props.theme.colors.border};
        background-color: transparent;
        transition: all 0.2s ease-in-out;

        &:hover {
        background-color: ${(props) => props.theme.colors.text};
        color: ${(props) => props.theme.colors.background};
        }
    }
    `;