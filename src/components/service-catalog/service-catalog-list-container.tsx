'use client'

import { useServices } from '@/hooks/service-catalog/use-service-catalog-list';
import React from 'react';
import { ServiceCard } from './service-catalog-list-card';

export const ServiceList = () => {
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