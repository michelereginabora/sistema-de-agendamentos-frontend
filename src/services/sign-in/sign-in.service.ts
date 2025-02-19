import apiService from '@/boot/axios';
import { IAuth, IAuthResponse } from '@/types/sign-in/sign-in.types';

class AuthService {
    private readonly baseURL = '/auth';
    private readonly TOKEN_KEY = '@App:token';

    async login(credentials: IAuth): Promise<IAuthResponse> {
        try {
            const response = await apiService.post<IAuthResponse>(`${this.baseURL}/login`, credentials);
            
            if (response.data.access_token) {
                this.setToken(response.data.access_token);

                apiService.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            }
            
            return response.data;
        } catch (error) {
            console.error('Erro no login:', error);
            throw new Error('Falha na autenticação');
        }
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        delete apiService.defaults.headers.common['Authorization'];
    }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    getToken(): string | null {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (token) {
            apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return token;
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        const hasToken = !!token;
        return hasToken;
    }
}

export const authService = new AuthService();


const token = localStorage.getItem('@App:token');
if (token) {
    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}