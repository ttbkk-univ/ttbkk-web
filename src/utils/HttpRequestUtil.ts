import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { env } from "../env";
import { PostgrestError } from "@supabase/supabase-js";

const timeout: number = 30000;
const serviceName: string = "TTBKK";
const notificationTypes: string[] = ["slack"];

const parseAxiosError = (error: AxiosError) => {
  return {
    message: error.message,
    name: error.name,
    stack: error.stack,
    config: error.config,
    code: error.code,
    request: error.request,
    responseStatus: error.response?.status,
    responseData: error.response?.data,
    raw: error.toJSON(),
  };
};

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
