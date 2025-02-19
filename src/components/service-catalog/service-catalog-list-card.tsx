import React from 'react';
import { BiTime } from 'react-icons/bi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { IService } from '@/types/service-catalog/service-catalog.types';
import Link from 'next/link';

interface ServiceCardProps {
  service: IService;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-5">
        <h3 className="text-xl font-bold mb-4">
          {service.name}
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <BiTime className="w-4 h-4" />
            <span>{service.duration} minutos</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <BsCurrencyDollar className="w-4 h-4" />
            <span className="text-lg font-medium">
              {parseFloat(service.price).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="px-5 pb-5">
      <Link
          href={{
            pathname: '/services-availability',
            query: { 
              id: service.id,
              name: service.name,
              duration: service.duration,
              price: service.price
            }
          }}          
          className="btn btn-primary inline-block w-full text-center"
        >
          Verificar disponibilidade
        </Link>
      </div>
    </div>
  );
};