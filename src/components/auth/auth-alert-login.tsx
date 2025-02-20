import React from 'react';
import Link from 'next/link';

export const AuthAlert = () => {
  const handleLoginClick = () => {
    sessionStorage.setItem('redirectUrl', window.location.pathname + window.location.search);
  };

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 flex justify-between items-center">
      <p className="text-blue-700">
        Faça login para agendar um horário
      </p>
      <Link 
        href="/sign-in?onBack=true"
        onClick={handleLoginClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Fazer Login
      </Link>
    </div>
  );
};