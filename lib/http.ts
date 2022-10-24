import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { getEnvRequestUrl } from './utils'

export const axiosHeaders: Record<string, string | boolean> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest',
}

class Http {
  private instance: AxiosInstance | null = null

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp()
  }

  initHttp() {
    const http = axios.create({
      headers: axiosHeaders,
      withCredentials: true,
    })

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        return this.handleError(error)
      }
    )

    http.interceptors.request.use((request) => {
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] =
        process.env.NODE_ENV !== 'production' ? '0' : '1'

      return request
    })

    this.instance = http
    return http
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.http.request(config)
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(getEnvRequestUrl(url), config)
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(getEnvRequestUrl(url), data, config)
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(getEnvRequestUrl(url), data, config)
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(getEnvRequestUrl(url), config)
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private handleError(error: any) {
    const axiosResponse: AxiosResponse = error.response

    return Promise.reject(
      new AxiosError(
        axiosResponse.statusText,
        String(axiosResponse.status),
        axiosResponse.config
      )
    )
  }
}

export const http = new Http()
