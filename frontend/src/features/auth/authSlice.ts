    import { createSlice } from '@reduxjs/toolkit';
    import type { PayloadAction } from '@reduxjs/toolkit';

    interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    }

    // Inicializa o estado buscando o token no localStorage
    const initialState: AuthState = {
    token: localStorage.getItem('access_token'),
    isAuthenticated: !!localStorage.getItem('access_token'),
    };

    const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Ação disparada quando o login dá certo
        loginSuccess: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('access_token', action.payload);
        },
        // Ação disparada ao clicar em "Sair"
        logout: (state) => {
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('access_token');
        },
    },
    });

    export const { loginSuccess, logout } = authSlice.actions;
    export default authSlice.reducer;