'use client';

import React from 'react';
import { IServiceAvailability, TimeSlot } from '@/types/service-availability/service-availability.types';

interface AvailableSlotsViewProps {
  availability: IServiceAvailability | null;
  loading: boolean;
  error: string | null;
  onSelectSlot: (timeSlot: TimeSlot) => void;
}

export const AvailableSlotsView = ({ 
  availability, 
  loading, 
  error,
  onSelectSlot 
}: AvailableSlotsViewProps) => {
  if (loading) {
    return (
      <div className="w-full bg-white rounded-lg shadow p-4">
        <p className="text-gray-600">Carregando horários disponíveis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-50 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!availability || !availability.availableSlots?.length) {
    return (
      <div className="w-full bg-white rounded-lg shadow p-4">
        <p className="text-gray-600">Selecione uma data para ver os horários disponíveis</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow mb-4 p-4">
        <h2 className="text-lg font-semibold text-gray-900">{availability.serviceName}</h2>
        <p className="text-sm text-gray-600">
          {new Date(availability.appointmentDate).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {availability.availableSlots.map((slot, index) => {
          const appointmentDateObj = new Date(availability.appointmentDate);
          
          const [startHour, startMinute] = slot.start.split(':').map(Number);
          const [endHour, endMinute] = slot.end.split(':').map(Number);
          
          const startDateTime = new Date(appointmentDateObj);
          startDateTime.setHours(startHour, startMinute, 0, 0);

          const endDateTime = new Date(appointmentDateObj);
          endDateTime.setHours(endHour, endMinute, 0, 0);

          return (
            <div 
              key={`${slot.start}-${index}`}
              className="bg-white rounded-lg shadow p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelectSlot(slot)}
            >
              <p className="text-center text-gray-800 font-medium">
                {startDateTime.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })} 
                {' - '} 
                {endDateTime.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};