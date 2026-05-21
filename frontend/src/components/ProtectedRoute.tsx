    import { Navigate, Outlet } from 'react-router-dom';
    import { useSelector } from 'react-redux';
    import { type RootState } from '../app/store';

    export function ProtectedRoute() {
    // Lê do Redux se o usuário está autenticado
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    // Se não estiver logado, redireciona para a página de login
    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    // Se estiver logado, permite renderizar as rotas filhas (o Outlet do layout)
    return <Outlet />;
    }