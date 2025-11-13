// services/config/api.config.ts

export const API_CONFIG = {
    // Base URLs
    BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:5151',
    TIMEOUT: 30000, // 30 seconds
    
    // API Versions
    V0: '/api',
    V1: '/api/v1',
    V2: '/api/v2',
    
    // Headers
    DEFAULT_HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    } as Record<string, string>,
    
    // Auth
    TOKEN_KEY: 'auth_token',
    REFRESH_TOKEN_KEY: 'refresh_token',
  }
  
  export const getAuthHeader = (token?: string): Record<string, string> => {
    const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem(API_CONFIG.TOKEN_KEY) : null)
    return authToken ? { Authorization: `Bearer ${authToken}` } : {}
  }
  
  export const getFullUrl = (endpoint: string, version: string = API_CONFIG.V0): string => {
    return `${API_CONFIG.BASE_URL}${version}${endpoint}`
    // return `${API_CONFIG.BASE_URL}${version}${endpoint}`
  }