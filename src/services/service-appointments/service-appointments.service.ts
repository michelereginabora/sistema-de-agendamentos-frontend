import api from '@/boot/axios'; // Importa a instância axios em vez do apiService
import { IAppointment } from '@/types/service-appointments/service-appointments.types';
import { requestInterceptor, responseInterceptor } from '@/boot/interceptors';
import apiService from '../api/api';

requestInterceptor(api);
responseInterceptor(api);

class ServiceAppointmentsAPI {
  private readonly baseURL = '/appointments';

  async postAppointment(data: Partial<IAppointment>): Promise<IAppointment> {
    return apiService.post<IAppointment>(this.baseURL, data);
  }
}

export const serviceAppointmentsAPI = new ServiceAppointmentsAPI();