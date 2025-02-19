import React from 'react';
import { IService } from '@/types/service-catalog/service-catalog.types';

interface ServiceCardProps {
  service: IService;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{service.name}</h3>
      <p className="mt-2">Duração: {service.duration} minutos</p>
      <p className="mt-1">Preço: R$ {service.price}</p>
    </div>
  );
};