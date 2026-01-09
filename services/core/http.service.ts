// services/core/http.service.ts

import { API_CONFIG, getAuthHeader, getFullUrl } from '../config/api.config'

interface RequestOptions extends RequestInit {
  token?: string
  version?: string
  params?: Record<string, any>
}

interface ApiResponse<T = any> {
  data: T
  message?: string
  status: number
  success: boolean
  result?:T
}

class HttpService {
  // private async request<T>(
  //   endpoint: string,
  //   options: RequestOptions = {}
  // ): Promise<ApiResponse<T>> {
  //   const { token, version, params, ...fetchOptions } = options

  //   // Build URL with query parameters
  //   let url = getFullUrl(endpoint, version)
  //   if (params) {
  //     const queryString = new URLSearchParams(params).toString()
  //     url += `?${queryString}`
  //   }

  //   // Build headers properly
  //   const authHeader = getAuthHeader(token)
  //   const headers: Record<string, string> = {
  //     ...API_CONFIG.DEFAULT_HEADERS,
  //   }

  //   // Add auth header if exists
  //   if (authHeader.Authorization) {
  //     headers.Authorization = authHeader.Authorization
  //   }

  //   // Merge with custom headers from options
  //   if (fetchOptions.headers) {
  //     const customHeaders = fetchOptions.headers as Record<string, string>
  //     Object.assign(headers, customHeaders)
  //   }

  //   try {
  //     const controller = new AbortController()
  //     const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

  //     const response = await fetch(url, {
  //       ...fetchOptions,
  //       headers,
  //       signal: controller.signal,
  //     })

  //     clearTimeout(timeoutId)

  //     // Parse response
  //     const data = await response.json()

  //     if (!response.ok) {
  //       throw {
  //         status: response.status,
  //         message: data.message || 'Request failed',
  //         data,
  //       }
  //     }

  //     return {
  //       data: data.data || data,
  //       message: data.message,
  //       status: response.status,
  //       success: true,
  //       result: data,
  //     }
  //   } catch (error: any) {
  //     console.error('HTTP Request Error:', error)
      
  //     // Handle timeout
  //     if (error.name === 'AbortError') {
  //       throw {
  //         status: 408,
  //         message: 'Request timeout',
  //         success: false,
  //       }
  //     }

  //     throw {
  //       status: error.status || 500,
  //       message: error.message || 'Network error',
  //       data: error.data,
  //       success: false,
  //     }
  //   }
  // }
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { token, version, params, ...fetchOptions } = options

    let url = getFullUrl(endpoint, version)
    if (params) {
      const queryString = new URLSearchParams(params).toString()
      url += `?${queryString}`
    }

    const headers: Record<string, string> = {
      ...API_CONFIG.DEFAULT_HEADERS,
    }

    // ພິສັດເພື່ອ admin side
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    // Merge with custom headers
    if (fetchOptions.headers) {
      Object.assign(headers, fetchOptions.headers as Record<string, string>)
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || 'Request failed',
          data,
        }
      }

      return {
        data: data.data || data,
        message: data.message,
        status: response.status,
        success: true,
        result: data,
      }
    } catch (error: any) {
      console.error('HTTP Request Error:', error)
      
      if (error.name === 'AbortError') {
        throw { status: 408, message: 'Request timeout', success: false }
      }

      throw {
        status: error.status || 500,
        message: error.message || 'Network error',
        data: error.data,
        success: false,
      }
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(
    endpoint: string,
    body?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  async put<T>(
    endpoint: string,
    body?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  async patch<T>(
    endpoint: string,
    body?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }

  // Upload file
  async upload<T>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const { token, version, params, ...fetchOptions } = options || {}
    
    // Build URL with query parameters
    let url = getFullUrl(endpoint, version)
    if (params) {
      const queryString = new URLSearchParams(params).toString()
      url += `?${queryString}`
    }

    // Build headers (no Content-Type for FormData)
    const authHeader = getAuthHeader(token)
    const headers: Record<string, string> = {}

    // Add auth header if exists
    if (authHeader.Authorization) {
      headers.Authorization = authHeader.Authorization
    }

    // Merge with custom headers
    if (fetchOptions.headers) {
      const customHeaders = fetchOptions.headers as Record<string, string>
      Object.assign(headers, customHeaders)
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

      const response = await fetch(url, {
        ...fetchOptions,
        method: 'POST',
        body: formData,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || 'Upload failed',
          data,
        }
      }

      return {
        data: data.data || data,
        message: data.message,
        status: response.status,
        success: true,
      }
    } catch (error: any) {
      console.error('Upload Error:', error)
      
      if (error.name === 'AbortError') {
        throw {
          status: 408,
          message: 'Upload timeout',
          success: false,
        }
      }

      throw {
        status: error.status || 500,
        message: error.message || 'Upload error',
        data: error.data,
        success: false,
      }
    }
  }
}

export const http = new HttpService()
export default http