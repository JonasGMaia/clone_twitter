    // src/styles/LayoutStyles.ts
    import styled from 'styled-components';
    import { Link } from 'react-router-dom';

    export const LayoutContainer = styled.div`
    display: flex;
    max-width: 1000px; /* Limita a largura para manter o conteúdo focado */
    margin: 0 auto;
    min-height: 100vh;
    `;

    export const Sidebar = styled.aside`
    width: 250px;
    border-right: ${(props) => props.theme.borders.thickness} solid ${(props) => props.theme.colors.border};
    padding: ${(props) => props.theme.spacing.large};
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.medium};
    `;

    export const MainContent = styled.main`
    flex: 1;
    border-right: ${(props) => props.theme.borders.thickness} solid ${(props) => props.theme.colors.border};
    `;

    export const NavLink = styled(Link)`
    font-size: 1.2rem;
    font-weight: bold;
    padding: ${(props) => props.theme.spacing.small} 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: ${(props) => props.theme.borders.thickness} solid transparent;
    
    &:hover {
        border-bottom-color: ${(props) => props.theme.colors.text};
    }
    `;