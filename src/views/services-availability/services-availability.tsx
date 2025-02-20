'use client';

import { useSearchParams } from 'next/navigation';
import { IService } from '@/types/service-catalog/service-catalog.types';
import { CalendarView } from '@/components/services-availability/services-availability-calendar';
import { AvailableSlotsView } from '@/components/services-availability/services-availability-slots';
import AppointmentSummaryModal from '@/components/service-appointments/services-appointments-summary';
import router from 'next/router';
import { AuthAlert } from '@/components/auth/auth-alert-login';
import { SuccessAlert } from '@/components/service-appointments/appointment-alert';
import { useServiceAvailability } from '@/hooks/service-availability/service-availability';
import { useServiceAppointment } from '@/hooks/service-appointment/service-appointment';

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
    error: bookingError,
    handleSelectSlot,
    handleConfirmAppointment,
    setIsModalOpen,
    setShowSuccessAlert,
    isAuthenticated
  } = useServiceAppointment();

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
                    
        {!isAuthenticated && status !== 'loading' && (
            <AuthAlert 
              onLogin={() => {
                const currentPath = window.location.pathname + window.location.search;
                router.push(`/sign-in?callbackUrl=${encodeURIComponent(currentPath)}`);
              }} 
            />
          )}
          
          <AvailableSlotsView 
            availability={availability}
            loading={loading}
            error={availabilityError || bookingError}
            onSelectSlot={handleSelectSlot}
          />
          
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