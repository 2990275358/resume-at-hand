import {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from "axios"
export interface IRequestInteerceptors<T = AxiosResponse> {
  requestInterceptors?: (
    value: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (value: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

export interface IRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IRequestInteerceptors<T>
}

export interface IDataType<T = any> {
  code: number
  data?: T
  msg?: string
}

export type RequestStatus = { isOk: boolean }
