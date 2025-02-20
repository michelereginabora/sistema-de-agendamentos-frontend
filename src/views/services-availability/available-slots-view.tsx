'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IService } from '@/types/service-catalog/service-catalog.types';
import { serviceAPI } from '@/services/service-availability/service-availability.service';
import AvailableSlotsView from './available-slots-view';
import { IServiceAvailability } from '@/types/service-availability/service-availability.types';
import { CalendarView } from '@/components/services-availability/services-availability-calendar';

export default function ServicesAvailabilityView() {
  const searchParams = useSearchParams();
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
      setError('Erro ao carregar horários disponíveis');
      console.error('Error fetching availability:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <div className="bg-white rounded-lg shadow p-4">
            <CalendarView service={service} onSelectDate={handleDateSelect} />
          </div>
        </div>
        
        <div className="w-full">
          <AvailableSlotsView 
            slots={availability?.availableSlots || []}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
