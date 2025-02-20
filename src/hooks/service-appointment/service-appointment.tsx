'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TimeSlot } from '@/types/service-availability/service-availability.types';
import { serviceAppointmentsAPI } from '@/services/service-appointments/service-appointments.service';
import { useAuth } from '@/hooks/auth/use-auth';

interface SuccessData {
  serviceName: string;
  date: string;
  time: string;
}

export const useServiceAppointment = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      const currentPath = window.location.pathname + window.location.search;
      const redirectUrl = `/sign-in?callbackUrl=${encodeURIComponent(currentPath)}`;
      router.push(redirectUrl);
      return;
    }

    try {
      const formattedDate = new Date(appointmentDate).toISOString().split('T')[0];
      const appointmentDateTime = `${formattedDate} ${slot.start}`;
      
      await serviceAppointmentsAPI.postAppointment({
        serviceId: service.id,
        appointmentDate: appointmentDateTime
      });

      setIsModalOpen(false);

      const displayDate = new Date(appointmentDate).toLocaleDateString('pt-BR', {
        timeZone: 'UTC',
      });
      
      setSuccessData({
        serviceName: service.name,
        date: displayDate,
        time: slot.start
      });
      
      setShowSuccessAlert(true);
      
      setTimeout(() => {
        setShowSuccessAlert(false);
        setSuccessData(null);
      }, 5000);
      
      return formattedDate; // Para atualizar a disponibilidade
    } catch (error) {
      console.error('Erro ao confirmar agendamento:', error);
      setError('Erro ao confirmar agendamento. Tente novamente.');
      throw error;
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