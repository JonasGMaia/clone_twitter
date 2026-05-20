    import { configureStore } from '@reduxjs/toolkit';
    import authReducer from '../features/auth/authSlice';

    export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    });

    // Tipagens essenciais para usar o TypeScript com o Redux
    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;