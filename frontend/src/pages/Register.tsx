    import { Link } from 'react-router-dom';

    export function Register() {
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>Criar Conta</h1>
        <p>Aqui ficará o formulário de cadastro.</p>
        <Link to="/login">Já tem conta? Faça login</Link>
        </div>
    );
    }