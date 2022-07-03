import { AxiosInstance } from 'axios';
import RequestStrategy, { RequestType } from './RequestStrategy';

class AxiosRequestStrategy implements RequestStrategy {
  constructor(private readonly instance: AxiosInstance) {}

  async request<T, D>(type: RequestType, url: string, data?: D): Promise<T> {
    const res = await this.instance[type]<T>(url, data);

    return res.data;
  }
}

export default AxiosRequestStrategy;
