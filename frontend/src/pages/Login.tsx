    import React, { useState } from 'react';
    import { useDispatch } from 'react-redux';
    import { useNavigate } from 'react-router-dom';
    import { api } from '../api/axios';
    import { loginSuccess } from '../features/auth/authSlice';
    import { AuthContainer, AuthBox, Title, InputGroup, Label, Input, SubmitButton, AuthFooter, StyledLink } from '../styles/AuthStyles';

    export const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
        // Faz a chamada à API para obter o token
        const response = await api.post('/token/', { username, password });
        
        // Guarda o token no Redux e no LocalStorage
        dispatch(loginSuccess({
            token: response.data.access,
            username: username // <-- A variável do seu input de login
        }));
        
        // Redireciona para a Home
        navigate('/');
        } catch (err) {
        console.error('Erro no login:', err);
        setError('Credenciais inválidas. Tente novamente.');
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <AuthContainer>
        <AuthBox>
            <Title>Entrar</Title>
            <form onSubmit={handleSubmit}>
            <InputGroup>
                <Label htmlFor="username">Usuário</Label>
                <Input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="password">Senha</Label>
                <Input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                />
            </InputGroup>

            {error && <p style={{ color: 'red', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</p>}

            <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? 'Acessando...' : 'Acessar'}
            </SubmitButton>
            </form>

            <AuthFooter>
                Não tem uma conta? <StyledLink to="/register">Inscreva-se aqui</StyledLink>
            </AuthFooter>
        </AuthBox>
        </AuthContainer>
    );
    };