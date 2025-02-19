'use client'

import { ptBR } from 'date-fns/locale';
import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './calendar-styles.css';
import { serviceAPI } from '@/services/service-availability/service-availability.service';


registerLocale('pt-BR', ptBR);

interface SimpleCalendarProps {
  onSelectDate: (formattedDate: string) => void;
  serviceId: string;
}

export const Calendar = ({ onSelectDate, serviceId }: SimpleCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [availableDates, setAvailableDates] = useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchMonthAvailability = async (date: Date) => {
    setIsLoading(true);
    try {
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      const availabilityMap: {[key: string]: boolean} = {};

      const promisesArray = Array.from({ length: daysInMonth }, (_, index) => {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), index + 1);
        const formattedDate = currentDate.toISOString().split('T')[0];
        
        return serviceAPI.getAvailability(serviceId, formattedDate)
          .then(availability => {
            const hasAvailableSlots = Array.isArray(availability.availableSlots) && 
                                    availability.availableSlots.length > 0;
            availabilityMap[formattedDate] = hasAvailableSlots;
  
          })
          .catch((error) => {
            console.error(`Erro ao buscar disponibilidade para ${formattedDate}:`, error);
            availabilityMap[formattedDate] = false;
          });
      });
      await Promise.all(promisesArray);
      setAvailableDates(availabilityMap);
    } catch (error) {
      console.error('Erro ao buscar disponibilidade:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMonthAvailability(currentMonth);
  }, [currentMonth, serviceId]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split('T')[0];
      onSelectDate(formattedDate);
    }
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };

  const dayClassNames = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const isAvailable = availableDates[formattedDate];
    
    const isCurrentMonth = date.getMonth() === currentMonth.getMonth() &&
                         date.getFullYear() === currentMonth.getFullYear();
    
    if (!isCurrentMonth) {
      return 'text-gray-300 pointer-events-none opacity-50';
    }
    
    if (isAvailable === false || (formattedDate in availableDates && !isAvailable)) {
      return 'bg-red-100 cursor-not-allowed pointer-events-none';
    }
    
    return isAvailable ? 'bg-green-100 hover:bg-green-200 cursor-pointer' : 'bg-red-100 cursor-not-allowed pointer-events-none';
  };

  return (
    <div className="rounded-xl shadow-lg relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        minDate={new Date()}
        locale="pt-BR"
        dateFormat="yyyy-MM-dd"
        dayClassName={dayClassNames}
        onMonthChange={handleMonthChange}
        calendarStartDay={0}
        renderDayContents={(day, date) => {
          return <div>{day}</div>;
        }}
      />
    </div>
  );
};