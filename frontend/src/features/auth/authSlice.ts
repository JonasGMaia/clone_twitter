    import { createSlice } from '@reduxjs/toolkit';
    import type { PayloadAction } from '@reduxjs/toolkit';

    interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    username: string | null; // <-- Novo campo
    }

    // Inicializa o estado buscando o token e o username no localStorage
    const initialState: AuthState = {
    token: localStorage.getItem('access_token'),
    isAuthenticated: !!localStorage.getItem('access_token'),
    username: localStorage.getItem('username'), // <-- Busca do armazenamento
    };

    const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Ação disparada quando o login dá certo (agora recebe um objeto com token e username)
        loginSuccess: (state, action: PayloadAction<{token: string; username: string}>) => {
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.isAuthenticated = true;
        localStorage.setItem('access_token', action.payload.token);
        localStorage.setItem('username', action.payload.username);
        },
        // Ação disparada ao clicar em "Sair"
        logout: (state) => {
        state.token = null;
        state.username = null;
        state.isAuthenticated = false;
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
        },
    },
    });

    export const { loginSuccess, logout } = authSlice.actions;
    export default authSlice.reducer;