import apiService from '@/boot/axios';
import { IAppointment } from '@/types/service-appointments/service-appointments.types';
import { requestInterceptor, responseInterceptor } from '@/boot/interceptors';

requestInterceptor(apiService);
responseInterceptor(apiService);

class ServiceAppointmentsAPI {
  private readonly baseURL = '/appointments';

  async postAppointment(data: Partial<IAppointment>): Promise<IAppointment> {
    return (await apiService.post<IAppointment>(this.baseURL, data)).data;
  }
}

export const serviceAppointmentsAPI = new ServiceAppointmentsAPI();