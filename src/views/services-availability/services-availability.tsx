'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { IService } from '@/types/service-catalog/service-catalog.types';
import { CalendarView } from '@/components/services-availability/services-availability-calendar';
import { AvailableSlotsView } from '@/components/services-availability/services-availability-slots';
import { AuthAlert } from '@/components/auth/auth-alert-login';
import { SuccessAlert } from '@/components/service-appointments/appointment-alert';
import { useServiceAvailability } from '@/hooks/service-availability/use-service-availability';
import { useServiceAppointment } from '@/hooks/service-appointment/use-service-appointment';
import { AppointmentSummaryModal } from '@/components/service-appointments/services-appointments-summary';

export default function ServicesAvailabilityView() {
  const searchParams = useSearchParams();
  
  const service: IService = {
    id: searchParams.get('id') || '',
    name: searchParams.get('name') || '',
    duration: Number(searchParams.get('duration')) || 0,
    price: parseFloat(searchParams.get('price') || '0').toFixed(2)
  };

  const {
    availability,
    loading,
    error: availabilityError,
    handleDateSelect
  } = useServiceAvailability();

  const {
    selectedSlot,
    isModalOpen,
    showSuccessAlert,
    successData,
    error: appointmentError,
    handleSelectSlot,
    handleConfirmAppointment,
    setIsModalOpen,
    setShowSuccessAlert,
    isAuthenticated
  } = useServiceAppointment();

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    handleDateSelect(service.id, formattedDate);
  }, [service.id]);

  const onDateSelect = (date: string) => {
    handleDateSelect(service.id, date);
  };

  const onConfirmAppointment = async () => {
    if (!availability || !selectedSlot) return;
    
    try {
      const formattedDate = await handleConfirmAppointment(
        service,
        availability.appointmentDate,
        selectedSlot
      );
      
      if (formattedDate) {
        handleDateSelect(service.id, formattedDate);
      }
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const hasNoAvailableSlots = !loading && availability?.availableSlots?.length === 0;

  return (
    <div className="container mx-auto px-4 py-6">
      {showSuccessAlert && successData && (
        <SuccessAlert 
          successData={successData}
          onClose={() => setShowSuccessAlert(false)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <div className="bg-white rounded-lg shadow p-4">
            <CalendarView
              service={service}
              onSelectDate={onDateSelect}
            />
          </div>
        </div>
        
        <div className="w-full">
                    
        {!isAuthenticated && (
            <AuthAlert />
          )}
          
          {hasNoAvailableSlots ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700">
                Não há horários disponíveis para esta data. Por favor, selecione outra data.
              </p>
            </div>
          ) : (
            <AvailableSlotsView 
              availability={availability}
              loading={loading}
              error={availabilityError || appointmentError}
              onSelectSlot={handleSelectSlot}
            />
          )}
          
          <AppointmentSummaryModal 
            serviceName={availability?.serviceName || ''}
            servicePrice={service.price}
            appointmentDate={availability?.appointmentDate || ''}
            selectedSlot={selectedSlot}
            onConfirmAppointment={onConfirmAppointment}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}