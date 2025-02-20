'use client';

import React from 'react';
import { Calendar } from './calendar/calendar';
import { ArrowLeft } from 'lucide-react';
import { IService } from '@/types/service-catalog/service-catalog.types';
import { format, parseISO } from 'date-fns';

interface CalendarViewProps {
  service: IService;
  onSelectDate: (date: string) => void;
}

export const CalendarView = ({ service, onSelectDate }: CalendarViewProps) => {
  const handleDateSelect = (date: string) => {
      const parsedDate = parseISO(date);
      const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      onSelectDate(formattedDate);
  };

  return (
    <div className="bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-800">
              Selecione uma data para o serviço: {service.name}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="rounded-lg">
          <div className="p-2">
            <Calendar 
              onSelectDate={handleDateSelect}
              serviceId={service.id}
            />
          </div>
        </div>
      </main>
    </div>
  );
};