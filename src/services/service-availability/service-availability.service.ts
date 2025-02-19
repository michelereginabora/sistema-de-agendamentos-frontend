import apiService from '@/boot/axios';
import { IServiceAvailability } from '@/types/service-availability/service-availability.types';

class ServiceAvailabilityAPI {
  private readonly baseURL = '/availability';

  async getAvailability(serviceId: string, date: string): Promise<IServiceAvailability> {
    const response = await apiService.get<IServiceAvailability>(
      `${this.baseURL}?serviceId=${serviceId}&date=${date}`
    );
    return response.data;
  }
}

export const serviceAPI = new ServiceAvailabilityAPI();