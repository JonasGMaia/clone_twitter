    // src/layouts/MainLayout.tsx
    import React from 'react';
    import { Outlet } from 'react-router-dom';
    import { LayoutContainer, Sidebar, MainContent, NavLink } from '../styles/LayoutStyles';

    export const MainLayout: React.FC = () => {
    return (
        <LayoutContainer>
        <Sidebar>
            <NavLink to="/">Início</NavLink>
            <NavLink to="/profile">Perfil</NavLink>
            <NavLink to="/login">Sair</NavLink> {/* Pode ser adaptado depois para chamar a action de logout no Redux */}
        </Sidebar>

        <MainContent>
            {/* O Outlet renderiza a página atual (Home, Profile, etc) */}
            <Outlet />
        </MainContent>
        </LayoutContainer>
    );
    };