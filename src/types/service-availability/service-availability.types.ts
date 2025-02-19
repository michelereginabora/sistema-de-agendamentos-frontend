export interface IServiceAvailability {
    serviceName: string;
    appointmentDate: Date;
    availableSlots: {
      start: string;
      end: string;
    }[];
  }