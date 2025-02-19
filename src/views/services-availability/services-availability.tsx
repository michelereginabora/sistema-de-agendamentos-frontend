'use client';
import { useSearchParams } from 'next/navigation';
import { IService } from '@/types/service-catalog/service-catalog.types';
import CalendarView from '@/components/services-availability/services-availability-calendar';

export default function ServicesAvailabilityPage() {
  const searchParams = useSearchParams();

  const service: IService = {
    id: searchParams.get('id') || '',
    name: searchParams.get('name') || '',
    duration: Number(searchParams.get('duration')) || 0,
    price: parseFloat(searchParams.get('price') || '0').toFixed(2)
  };
  
  const handleDateSelect = (date: string) => {
    console.log('Selected date:', date, 'for service:', service);
    // 
  };

  return (
    <main className="container mx-auto px-4">
      <CalendarView 
        service={service}
        onSelectDate={handleDateSelect} 
      />
    </main>
  );
}