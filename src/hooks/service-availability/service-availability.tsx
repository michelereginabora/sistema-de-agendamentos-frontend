import { useState } from 'react';
import { IServiceAvailability } from '@/types/service-availability/service-availability.types';
import { serviceAPI } from '@/services/service-availability/service-availability.service';

export const useServiceAvailability = () => {
  const [availability, setAvailability] = useState<IServiceAvailability | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateSelect = async (serviceId: string, date: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await serviceAPI.getAvailability(serviceId, date);
      setAvailability(response);
    } catch (err) {
      setError('Erro ao carregar horários disponíveis');
    } finally {
      setLoading(false);
    }
  };

  return {
    availability,
    loading,
    error,
    handleDateSelect
  };
};
