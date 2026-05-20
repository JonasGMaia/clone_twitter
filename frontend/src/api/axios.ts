    import axios from 'axios';

    // Cria uma instância base apontando para o nosso back-end Django
    export const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    });

    // Interceptador: antes de qualquer requisição sair, ele injeta o token se existir
    api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    });