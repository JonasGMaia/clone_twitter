    import axios from 'axios';

    export const api = axios.create({
    // O import.meta.env é a forma como o Vite lê o arquivo .env
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    });

    api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    }); 