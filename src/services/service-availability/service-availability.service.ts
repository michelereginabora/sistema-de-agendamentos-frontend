import apiService from '@/boot/axios';
import { IServiceAvailability } from '@/types/service-availability/service-availability.types';

class ServiceAvailabilityAPI {
  private readonly baseURL = '/availability';

  async getAvailability(): Promise<IServiceAvailability[]> {
    return (await apiService.get<IServiceAvailability[]>(this.baseURL)).data;
  }
}

export const serviceAPI = new ServiceAvailabilityAPI();