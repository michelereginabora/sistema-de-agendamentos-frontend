import apiService from '@/boot/axios';
import { IService } from '@/types/service-catalog/service-catalog.types';


class ServiceAPI {
  private readonly baseURL = '/services';

  async getAllServices(): Promise<IService[]> {
    return (await apiService.get<IService[]>(this.baseURL)).data;
  }
}

export const serviceAPI = new ServiceAPI();