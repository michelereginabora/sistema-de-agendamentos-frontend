
import api from '@/boot/axios';
import { IAuth, IAuthResponse } from '@/types/sign-in/sign-in.types';
import apiService from '../api/api';

class AuthService {
    private readonly baseURL = '/auth';
    private readonly TOKEN_KEY = '@App:token';

    async login(credentials: IAuth): Promise<IAuthResponse> {
        try {
            const response = await apiService.post<IAuthResponse>(`${this.baseURL}/login`, credentials);
            
            if (response.access_token) {
                this.setToken(response.access_token);
            }
            
            return response;
        } catch (error) {
            console.error('Erro no login:', error);
            throw new Error('Falha na autenticação');
        }
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        delete api.defaults.headers.common['Authorization'];
    }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    getToken(): string | null {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return token;
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token;
    }
}

export const authService = new AuthService();

authService.getToken();