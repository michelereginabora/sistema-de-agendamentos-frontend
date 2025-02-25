
import { IService } from '@/types/service-catalog/service-catalog.types';
import apiService from '../api/api';


class ServiceAPI {
  private readonly baseURL = '/services';

  async getAllServices(): Promise<IService[]> {
    return apiService.get<IService[]>(this.baseURL);
  }
}

export const serviceAPI = new ServiceAPI();