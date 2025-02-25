
import { IServiceAvailability } from '@/types/service-availability/service-availability.types';
import apiService from '../api/api';

class ServiceAvailabilityAPI {
  private readonly baseURL = '/availability';

  async getAvailability(serviceId: string, date: string): Promise<IServiceAvailability> {
    return apiService.get<IServiceAvailability>(
      `${this.baseURL}?serviceId=${serviceId}&date=${date}`
    );
  }
}

export const serviceAPI = new ServiceAvailabilityAPI();