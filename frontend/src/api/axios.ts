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

        api.interceptors.response.use(
    (response) => response, // Se a resposta der sucesso, apenas repassa
    async (error) => {
        const originalRequest = error.config;

        // Se o erro for de autorização (401) e ainda não tentamos fazer o retry
        if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Marca para não entrar num loop infinito

        try {
            const refreshToken = localStorage.getItem('refresh_token');
            
            // Faz a requisição para renovar o token (verifique se sua rota é essa mesma)
            const response = await axios.post(`${api.defaults.baseURL}/token/refresh/`, {
            refresh: refreshToken,
            });

            // Salva o novo token de acesso
            const newAccessToken = response.data.access;
            localStorage.setItem('access_token', newAccessToken);

            // Atualiza a requisição original com o novo token e refaz a chamada
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
            
        } catch (refreshError) {
            // Se o refresh token também expirou ou for inválido, desloga o usuário
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            // Redireciona para o login
            window.location.href = '/login';
            return Promise.reject(refreshError);
        }
        }
        return Promise.reject(error);
    }
    );