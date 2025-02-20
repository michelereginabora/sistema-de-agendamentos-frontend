'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IService } from '@/types/service-catalog/service-catalog.types';
import { IServiceAvailability, TimeSlot } from '@/types/service-availability/service-availability.types';
import { CalendarView } from '@/components/services-availability/services-availability-calendar';
import { AvailableSlotsView } from '@/components/services-availability/services-availability-slots';
import AppointmentSummaryModal from '@/components/service-appointments/services-appointments-summary';
import { useAuth } from '@/hooks/auth/use-auth';
import { serviceAPI } from '@/services/service-availability/service-availability.service';
import { serviceAppointmentsAPI } from '@/services/service-appointments/service-appointments.service';

export default function ServicesAvailabilityView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  
  const [availability, setAvailability] = useState<IServiceAvailability | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successData, setSuccessData] = useState<{
    serviceName: string;
    date: string;
    time: string;
  } | null>(null);

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
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSlot = (timeSlot: TimeSlot) => {
    setSelectedSlot(timeSlot);
    setIsModalOpen(true);
    
    if (!availability) return;

  };

  const handleConfirmBooking = async () => {
    if (!isAuthenticated) {
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    try {
      if (!availability || !selectedSlot) {
        throw new Error('Dados do agendamento incompletos');
      }

      const formattedDate = new Date(availability.appointmentDate).toISOString().split('T')[0];
      const appointmentDateTime = `${formattedDate} ${selectedSlot.start}`;
      
      await serviceAppointmentsAPI.postAppointment({
        serviceId: service.id,
        appointmentDate: appointmentDateTime
      });

      setIsModalOpen(false);

      const displayDate = new Date(availability.appointmentDate).toLocaleDateString('pt-BR');
      
      setSuccessData({
        serviceName: service.name,
        date: displayDate,
        time: selectedSlot.start
      });
      

      setShowSuccessAlert(true);
    
      handleDateSelect(formattedDate);
      
      setTimeout(() => {
        setShowSuccessAlert(false);
        setSuccessData(null);
      }, 5000);
      
    } catch (error) {
      console.error('Erro ao confirmar agendamento:', error);
      setError('Erro ao confirmar agendamento. Tente novamente.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {showSuccessAlert && successData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-4">Agendamento Confirmado!</h3>
              <div className="space-y-2 text-gray-700">
                <p>Serviço: <span className="font-semibold">{successData.serviceName}</span></p>
                <p>Data: <span className="font-semibold">{successData.date}</span></p>
                <p>Horário: <span className="font-semibold">{successData.time}</span></p>
              </div>
              <button 
                onClick={() => setShowSuccessAlert(false)}
                className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
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
          
          {!isAuthenticated && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-blue-700">
                Faça login para agendar um horário
              </p>
            </div>
          )}
          
          <AppointmentSummaryModal 
            serviceName={availability?.serviceName || ''}
            servicePrice={service.price}
            appointmentDate={availability?.appointmentDate || ''}
            selectedSlot={selectedSlot}
            onConfirmBooking={handleConfirmBooking}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}