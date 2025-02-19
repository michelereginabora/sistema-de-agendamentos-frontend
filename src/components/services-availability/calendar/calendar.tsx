"use client"
import { ptBR } from 'date-fns/locale';
import React, { useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './calendar-styles.css';

registerLocale('pt-BR', ptBR);

interface SimpleCalendarProps {
  onSelectDate: (formattedDate: string) => void;
}

export const SimpleCalendar = ({ onSelectDate }: SimpleCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      onSelectDate(formattedDate);
      console.log('Data selecionada:', formattedDate);
    }
  };

  return (
    <div className="rounded-xl shadow-lg">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        minDate={new Date()}
        locale="pt-BR"
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default SimpleCalendar;