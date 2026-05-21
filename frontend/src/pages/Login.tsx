    // src/pages/Login.tsx
    import React, { useState } from 'react';
    import { useDispatch } from 'react-redux';
    import { AuthContainer, AuthBox, Title, InputGroup, Label, Input, SubmitButton, AuthFooter, StyledLink } from '../styles/AuthStyles';
    // Importe a sua action do Redux aqui. Exemplo:
    // import { loginUser } from '../features/auth/authSlice';

    const Login: React.FC = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // dispatch(loginUser({ username, password }));
        console.log('Login attempt:', { username, password });
    };

    return (
        <AuthContainer>
        <AuthBox>
            <Title>Entrar</Title>
            <form onSubmit={handleSubmit}>
            <InputGroup>
                <Label htmlFor="username">Utilizador</Label>
                <Input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="password">Palavra-passe</Label>
                <Input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                />
            </InputGroup>

            <SubmitButton type="submit">Acessar</SubmitButton>
            </form>

            <AuthFooter>
                Não tem uma conta? <StyledLink to="/register">Registe-se aqui</StyledLink>
            </AuthFooter>
        </AuthBox>
        </AuthContainer>
    );
    };

    export  {Login};