export interface IServiceAvailability {
  serviceName: string;
  appointmentDate: string;
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
}