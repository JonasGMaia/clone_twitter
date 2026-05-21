    // src/styles/AuthStyles.ts
    import styled from 'styled-components';
    import { Link } from 'react-router-dom';

    export const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: ${(props) => props.theme.spacing.medium};
    `;

    export const AuthBox = styled.div`
    width: 100%;
    max-width: 400px;
    padding: ${(props) => props.theme.spacing.xlarge};
    border: ${(props) => props.theme.borders.thickness} solid ${(props) => props.theme.colors.border};
    background-color: ${(props) => props.theme.colors.surface};
    box-shadow: 8px 8px 0px ${(props) => props.theme.colors.border}; /* Sombra sólida para o toque retrô */
    `;

    export const Title = styled.h1`
    margin-bottom: ${(props) => props.theme.spacing.large};
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    `;

    export const InputGroup = styled.div`
    margin-bottom: ${(props) => props.theme.spacing.large};
    `;

    export const Label = styled.label`
    display: block;
    margin-bottom: ${(props) => props.theme.spacing.small};
    font-weight: bold;
    `;

    export const Input = styled.input`
    width: 100%;
    padding: ${(props) => props.theme.spacing.medium};
    border: ${(props) => props.theme.borders.thickness} solid ${(props) => props.theme.colors.border};
    background-color: ${(props) => props.theme.colors.background};
    font-family: inherit;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: ${(props) => props.theme.colors.primary};
    }
    `;

    export const SubmitButton = styled.button`
    width: 100%;
    padding: ${(props) => props.theme.spacing.medium};
    font-size: 1.1rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: ${(props) => props.theme.spacing.medium};
    `;

        export const AuthFooter = styled.div`
    margin-top: ${(props) => props.theme.spacing.large};
    text-align: center;
    font-size: 0.9rem;
    `;

    export const StyledLink = styled(Link)`
    color: ${(props) => props.theme.colors.primary};
    font-weight: bold;
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${(props) => props.theme.colors.text};
        background-color: ${(props) => props.theme.colors.primary};
    }
    `;