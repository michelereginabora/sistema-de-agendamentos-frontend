"use client"

import { useState, useEffect } from 'react';
import { serviceAPI } from '@/services/service-catalog/service-catalog.service';
import { IService } from '@/types/service-catalog/service-catalog.types';

export const useServices = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceAPI.getAllServices();
        setServices(data);
      } catch (err) {
        setError('Erro ao carregar serviços');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};