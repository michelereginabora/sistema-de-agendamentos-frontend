'use client';

import { useAuth } from '@/hooks/auth/use-auth';
import { IAuth } from '@/types/sign-in/sign-in.types';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const LoginForm = () => {
    const { login, loading, error } = useAuth();
    const [credentials, setCredentials] = useState<IAuth>({
        email: '',
        password: ''
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const success = await login(credentials);
        
        if (success) {
            router.push(redirectUrl);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={credentials.email}
                        onChange={e => setCredentials(prev => ({
                            ...prev,
                            email: e.target.value
                        }))}
                        required
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Digite sua senha"
                        value={credentials.password}
                        onChange={e => setCredentials(prev => ({
                            ...prev,
                            password: e.target.value
                        }))}
                        required
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? 'Carregando...' : 'Entrar'}
                </button>

                {error && <p className="mt-4 text-red-500 text-center text-sm">{error}</p>}
            </form>
        </div>
    );
};