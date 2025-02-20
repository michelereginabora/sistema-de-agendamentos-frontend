import React from 'react';
import { TimeSlot } from "@/types/service-availability/service-availability.types";

interface AppointmentSummaryModalProps {
  serviceName: string;
  servicePrice: string;
  appointmentDate: string;
  selectedSlot: TimeSlot | null;
  onConfirmBooking: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentSummaryModal = ({
  serviceName,
  servicePrice,
  appointmentDate,
  selectedSlot,
  onConfirmBooking,
  isOpen,
  onClose
}: AppointmentSummaryModalProps) => {
  if (!selectedSlot || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Resumo do Agendamento</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Serviço:</span>
            <span>{serviceName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Data:</span>
            <span>{new Date(appointmentDate).toLocaleDateString('pt-BR', {
              timeZone: 'UTC'
            })}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Horário:</span>
            <span>{selectedSlot.start} - {selectedSlot.end}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Valor:</span>
            <span>R$ {servicePrice}</span>
          </div>
        </div>

        <div className="mt-6">
          <button 
            onClick={onConfirmBooking}
            className="w-full btn btn-primary py-2 px-4 rounded-md transition-colors"
          >
            Confirmar Agendamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummaryModal;