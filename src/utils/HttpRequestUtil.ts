import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { env } from '../env';
import { PostgrestError } from '@supabase/postgrest-js/src/types.ts';

const timeout: number = 30000;
const serviceName: string = 'TTBKK';
const notificationTypes: string[] = ['slack'];

const parseAxiosError = (error: AxiosError) => {
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

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return axios
    .get<T>(url, { ...config, timeout })
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      axios.post(env.api.errorHelper, {
        serviceName,
        types: notificationTypes,
        description: JSON.stringify(parseAxiosError(error)),
      });
      return Promise.reject(error);
    });
}

export async function post<T, I = unknown>(
  url: string,
  data?: I,
  config?: AxiosRequestConfig,
): Promise<T> {
  return axios
    .post<T>(url, data, { ...config, timeout })
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      axios.post(env.api.errorHelper, {
        serviceName,
        types: notificationTypes,
        description: JSON.stringify(parseAxiosError(error)),
      });
      return Promise.reject(error);
    });
}

export async function postError(error: Error | PostgrestError) {
  axios
    .post(env.api.errorHelper, {
      serviceName,
      types: notificationTypes,
      description: JSON.stringify(error),
    })
    .catch(console.error);
}
