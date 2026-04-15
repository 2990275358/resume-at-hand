import axios from "axios"
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import type {
  IRequestConfig,
  IRequestInteerceptors,
  RequestStatus,
  IDataType
} from "./type"
import { loginManager } from "@/utils"
import { ElMessage } from "element-plus"

class JmrRequest {
  instance: AxiosInstance
  interceptors?: IRequestInteerceptors
  constructor(config: IRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存每个实例独有的拦截器
    this.interceptors = config.interceptors
    // 每个实例独有的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    // 所有实例都有的拦截器
    // 请求拦截
    this.instance.interceptors.request.use(
      (value) => {
        return value
      },
      (err) => {
        return err
      }
    )
    // 响应拦截
    this.instance.interceptors.response.use(
      (value) => {
        const { code, msg } = value.data
        let isOk = true
        if (code >= 400) {
          if (code === 401) {
            loginManager.remove()
          }
          ElMessage.error(msg)
          isOk = false
        }
        if (value.data instanceof ArrayBuffer) {
          return {
            data: value.data,
            isOk,
            code: 200
          }
        }
        return {
          isOk,
          ...value.data
        }
      },
      (err) => {
        return {
          isOk: false,
          code: 500,
          msg: err?.message || "服务器错误"
        }
      }
    )
  }
  requset<T = any>(config: IRequestConfig<T>): Promise<T & RequestStatus> {
    return new Promise<T & RequestStatus>((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(
          config as InternalAxiosRequestConfig
        )
      }
      this.instance
        .request<any, T & RequestStatus>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(
              res
            ) as unknown as T & RequestStatus
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }
  get<T = any>(
    config: IRequestConfig<IDataType<T> & RequestStatus>
  ): Promise<IDataType<T> & RequestStatus> {
    return this.requset({ ...config, method: "GET" })
  }
  post<T = any>(
    config: IRequestConfig<IDataType<T> & RequestStatus>
  ): Promise<IDataType<T> & RequestStatus> {
    return this.requset({ ...config, method: "POST" })
  }
  delete<T = any>(
    config: IRequestConfig<IDataType<T> & RequestStatus>
  ): Promise<IDataType<T> & RequestStatus> {
    return this.requset({ ...config, method: "DELETE" })
  }
  patch<T = any>(
    config: IRequestConfig<IDataType<T> & RequestStatus>
  ): Promise<IDataType<T> & RequestStatus> {
    return this.requset({ ...config, method: "PATCH" })
  }
  put<T = any>(
    config: IRequestConfig<IDataType<T> & RequestStatus>
  ): Promise<IDataType<T> & RequestStatus> {
    return this.requset({ ...config, method: "PUT" })
  }
}

const jmrrequest = new JmrRequest({
  timeout: Number(import.meta.env.VITE_API_TIMEOUT),
  baseURL: import.meta.env.VITE_API_BASE_URL,
  interceptors: {
    requestInterceptors(value) {
      const token = loginManager.getToken()
      if (token) {
        value.headers.Authorization = `Bearer ${token}`
      }
      return value
    }
  }
})
export default jmrrequest
