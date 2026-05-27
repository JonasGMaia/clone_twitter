    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { api } from '../api/axios';
    import { AuthContainer, AuthBox, Title, InputGroup, Label, Input, SubmitButton, AuthFooter, StyledLink } from '../styles/AuthStyles';

    export const Register: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
        // Ajuste a rota '/users/' se o seu endpoint no Django for diferente (ex: '/users/register/')
        await api.post('/users/', { username, email, password });
        
        // Se registar com sucesso, envia para a página de login
        navigate('/login');
        } catch (err) {
        console.error('Erro no registo:', err);
        setError('Erro ao criar conta. Verifique os dados e tente novamente.');
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <AuthContainer>
        <AuthBox>
            <Title>Cadastro</Title>
            <form onSubmit={handleSubmit}>
            <InputGroup>
                <Label htmlFor="reg-username">Usuário</Label>
                <Input 
                type="text" 
                id="reg-username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="reg-email">E-mail</Label>
                <Input 
                type="email" 
                id="reg-email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="reg-password">Senha</Label>
                <Input 
                type="password" 
                id="reg-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                />
            </InputGroup>

            {error && <p style={{ color: 'red', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</p>}

            <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? 'Criando...' : 'Criar Conta'}
            </SubmitButton>
            </form>
            
            <AuthFooter>
                Já tem uma conta? 
                <StyledLink to="/login">Entre aqui</StyledLink>
            </AuthFooter>
        </AuthBox>
        </AuthContainer>
    );
    };