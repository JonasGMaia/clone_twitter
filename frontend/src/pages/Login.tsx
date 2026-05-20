    import { Link } from 'react-router-dom';

    export function Login() {
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>Entrar no Clone Twitter</h1>
        <p>Aqui ficará o formulário de login.</p>
        <Link to="/register">Não tem conta? Cadastre-se</Link>
        </div>
    );
    }