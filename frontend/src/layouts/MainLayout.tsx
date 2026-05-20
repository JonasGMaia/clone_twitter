    import { Outlet, Link } from 'react-router-dom';

    export function MainLayout() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar Simples (Menu lateral) */}
        <aside style={{ width: '250px', borderRight: '1px solid #ccc', padding: '20px' }}>
            <h2>Clone Twitter</h2>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <Link to="/">Página Inicial</Link>
            <Link to="/profile">Perfil</Link>
            <button style={{ marginTop: '20px' }}>Sair</button>
            </nav>
        </aside>

        {/* Conteúdo Dinâmico Principal */}
        <main style={{ flex: 1, padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <Outlet /> {/* Aqui renderiza o Feed ou o Perfil */}
        </main>
        </div>
    );
    }