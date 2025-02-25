'use-client'

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/sign-in/sign-in.service';
import { IAuth } from '@/types/sign-in/sign-in.types';

export const useAuth = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = authService.isAuthenticated();
            console.log('Verificação inicial de autenticação:', authenticated);
            setIsAuthenticated(authenticated);
        };

        checkAuth();
    }, []);

    const login = useCallback(async (credentials: IAuth) => {
        try {
            setLoading(true);
            setError(null);
            
            await authService.login(credentials);
            setIsAuthenticated(true);
            
            return true;
        } catch (err) {
            setError('Credenciais inválidas');
            setIsAuthenticated(false);
            console.error('Erro no login:', err);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setIsAuthenticated(false);
        router.push('/sign-in');
    }, [router]);

    return {
        login,
        logout,
        loading,
        error,
        isAuthenticated
    };
};