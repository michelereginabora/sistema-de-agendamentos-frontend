'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { IService } from '@/types/service-catalog/service-catalog.types';
import { IServiceAvailability, TimeSlot } from '@/types/service-availability/service-availability.types';
import { serviceAPI } from '@/services/service-availability/service-availability.service';
import { CalendarView } from '@/components/services-availability/services-availability-calendar';
import { AvailableSlotsView } from '@/components/services-availability/services-availability-slots';
import { useAuth } from '@/hooks/auth/use-auth';

export default function ServicesAvailabilityView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  const [availability, setAvailability] = useState<IServiceAvailability | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service: IService = {
    id: searchParams.get('id') || '',
    name: searchParams.get('name') || '',
    duration: Number(searchParams.get('duration')) || 0,
    price: parseFloat(searchParams.get('price') || '0').toFixed(2)
  };

  const handleDateSelect = async (date: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await serviceAPI.getAvailability(service.id, date);
      setAvailability(response);
    } catch (err) {
      console.error('Error fetching availability:', err);
      setError('Erro ao carregar horários disponíveis');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSlot = (timeSlot: TimeSlot) => {
    if (!availability) return;

    if (!isAuthenticated) {
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
      console.log('Redirecionando para a página de login');
      return;
    }

    console.log('Selected appointment:', {
      serviceName: availability.serviceName,
      appointmentDate: availability.appointmentDate,
      timeSlot
    });
    // lógica para prosseguir com o agendamento
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {!isAuthenticated && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <p className="text-blue-700">
            Faça login para agendar um horário
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <div className="bg-white rounded-lg shadow p-4">
            <CalendarView
              service={service}
              onSelectDate={handleDateSelect}
            />
          </div>
        </div>
        
        <div className="w-full">
          <AvailableSlotsView 
            availability={availability}
            loading={loading}
            error={error}
            onSelectSlot={handleSelectSlot}
          />
        </div>
      </div>
    </div>
  );
}