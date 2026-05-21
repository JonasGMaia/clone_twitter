    // src/pages/Register.tsx
    import React, { useState } from 'react';
    import { useDispatch } from 'react-redux';
    import { AuthContainer, AuthBox, Title, InputGroup, Label, Input, SubmitButton, AuthFooter, StyledLink } from '../styles/AuthStyles';
    // import { registerUser } from '../features/auth/authSlice';

    const Register: React.FC = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // dispatch(registerUser({ username, email, password }));
        console.log('Register attempt:', { username, email, password });
    };

    return (
        <AuthContainer>
        <AuthBox>
            <Title>Registro</Title>
            <form onSubmit={handleSubmit}>
            <InputGroup>
                <Label htmlFor="reg-username">Utilizador</Label>
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
                <Label htmlFor="reg-password">Palavra-passe</Label>
                <Input 
                type="password" 
                id="reg-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                />
            </InputGroup>

            <SubmitButton type="submit">Criar Conta</SubmitButton>
            </form>
            <AuthFooter>
                Já tem uma conta? 
                <StyledLink to="/login">Entre aqui</StyledLink>
            </AuthFooter>
        </AuthBox>
        </AuthContainer>
    );
    };

    export  {Register};