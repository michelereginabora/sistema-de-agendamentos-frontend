'use client';
import React from 'react';
import { SimpleCalendar } from './calendar/calendar';
import { ArrowLeft } from 'lucide-react';
import { IService } from '@/types/service-catalog/service-catalog.types';

interface CalendarViewProps {
 service: IService;
 onSelectDate: (date: string) => void;
}

const CalendarView = ({ service, onSelectDate }: CalendarViewProps) => {
 const handleDateSelect = (date: string) => {
//    console.log('CalendarPage received date:', date);
   onSelectDate(date);
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
             Selecione uma data para o serviço: {service?.name}
           </h1>
         </div>
       </div>
     </header>

     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
       <div className="rounded-lg">
         <div className="p-2">
           <div className="mb-4">
           </div>
           <SimpleCalendar onSelectDate={handleDateSelect} />
         </div>
       </div>
     </main>
   </div>
 );
};

export default CalendarView;