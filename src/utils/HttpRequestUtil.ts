import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from '../env';

const timeout: number = 30000;
const serviceName: string = 'TTBKK';
const notificationTypes: string[] = ['slack'];

const parseAxiosError = (error: AxiosError): any => {
  return {
    message: error.message,
    name: error.name,
    stack: error.stack,
    config: error.config,
    code: error.code,
    ...(error.request && { request: error.request }),
    ...(error.response?.status && { responseStatus: error.response?.status }),
    ...(error.response?.data && { responseData: error.response?.data }),
    raw: error.toJSON(),
  };
};

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axios.get<T>(url, { ...config, timeout }).catch((error: AxiosError) => {
    axios.post(env.api.errorHelper, {
      serviceName,
      types: notificationTypes,
      description: JSON.stringify(parseAxiosError(error)),
    });
    throw error;
  });
}

export async function post<T>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> {
  return axios.post(url, data, { ...config, timeout }).catch((error: AxiosError) => {
    return axios.post(env.api.errorHelper, {
      serviceName,
      types: notificationTypes,
      description: JSON.stringify(parseAxiosError(error)),
    });
  });
}
