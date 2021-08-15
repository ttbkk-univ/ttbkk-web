import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from '../env';

export async function post(
  url: string,
  data?: any,
  headers?: AxiosRequestConfig,
): Promise<AxiosResponse> {
  return axios.post(url, data, headers).catch(() => {
    return axios.post(env.api.errorHelper, {
      serviceName: 'TTBKK',
      types: ['slack'],
    });
  });
}

export async function get<T>(url: string, headers?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axios.get(url, headers).catch(() => {
    return axios.post(env.api.errorHelper, {
      serviceName: 'TTBKK',
      types: ['slack'],
    });
  });
}
