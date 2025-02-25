'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { TimeSlot } from '@/types/service-availability/service-availability.types';
import { serviceAppointmentsAPI } from '@/services/service-appointments/service-appointments.service';
import { useAuth } from '@/hooks/auth/use-auth';

interface SuccessData {
  serviceName: string;
  date: string;
  time: string;
}

export const useServiceAppointment = () => {
  const { isAuthenticated } = useAuth();
  
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [error] = useState<string | null>(null);

  const handleSelectSlot = (timeSlot: TimeSlot) => {
    setSelectedSlot(timeSlot);
    setIsModalOpen(true);
  };


const handleConfirmAppointment = async (
  service: { id: string; name: string },
  appointmentDate: string,
  slot: TimeSlot
) => {
  if (!isAuthenticated) {
    sessionStorage.setItem('redirectUrl', window.location.pathname + window.location.search);
    window.location.href = '/sign-in'; 
    return;
  }

  try {
    const formattedDate = new Date(appointmentDate).toISOString().split('T')[0];
    const appointmentDateTime = `${formattedDate} ${slot.start}`;
    
    await serviceAppointmentsAPI.postAppointment({
      serviceId: service.id,
      appointmentDate: appointmentDateTime
    });

    const displayDate = new Date(appointmentDate).toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    });
    
    setSuccessData({
      serviceName: service.name,
      date: displayDate,
      time: slot.start
    });
    
    setIsModalOpen(false);
    setShowSuccessAlert(true);
    
    setTimeout(() => {
      setShowSuccessAlert(false);
      setSuccessData(null);
    }, 3000);
    
    return formattedDate;

  } catch (error: any) {
    const errorMessage = error.response?.data?.statusCode === 400 && 
      error.response?.data?.message?.includes('já possui o agendamento')
      ? error.response.data.message
      : 'Erro ao confirmar agendamento. Tente novamente.';

    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: errorMessage,
      confirmButtonText: 'OK',
    });

    setIsModalOpen(false);
  }
};

  return {
    selectedSlot,
    isModalOpen,
    showSuccessAlert,
    successData,
    error,
    handleSelectSlot,
    handleConfirmAppointment,
    setIsModalOpen,
    setShowSuccessAlert,
    isAuthenticated
  };
};