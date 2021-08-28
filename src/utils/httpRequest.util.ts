import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from '../env';

const timeout: number = 5000;

export async function post<T>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> {
  return axios.post(url, data, { ...config, timeout }).catch(() => {
    return axios.post(env.api.errorHelper, {
      serviceName: 'TTBKK',
      types: ['slack'],
    });
  });
}

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axios.get(url, { ...config, timeout }).catch(() => {
    return axios.post(env.api.errorHelper, {
      serviceName: 'TTBKK',
      types: ['slack'],
    });
  });
}
