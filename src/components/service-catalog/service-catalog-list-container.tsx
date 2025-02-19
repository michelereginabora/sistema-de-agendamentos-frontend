"use client"

import { useServices } from '@/hooks/service-catalog/service-catalog-list-hook';
import React from 'react';
import { ServiceCard } from './service-catalog-list-card';

export const ServiceList: React.FC = () => {
  const { services, loading, error } = useServices();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-6">
      <h2>CONHEÇA NOSSOS SERVIÇOS</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};