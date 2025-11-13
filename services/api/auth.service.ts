// services/api/auth.service.ts

import { http } from '../core/http.service'
import { AUTH_ENDPOINTS } from '../endpoints/auth.endpoint'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  created_at: string
}

export interface AuthResponse {
  user: User
  token: string
  refresh_token?: string
}

class AuthService {
  async login(payload: LoginPayload) {
    return http.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, payload)
  }

  async register(payload: RegisterPayload) {
    return http.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, payload)
  }

  async logout(token?: string) {
    return http.post(AUTH_ENDPOINTS.LOGOUT, {}, { token })
  }

  async refreshToken(refreshToken: string) {
    return http.post<AuthResponse>(AUTH_ENDPOINTS.REFRESH_TOKEN, {
      refresh_token: refreshToken,
    })
  }

  async forgotPassword(email: string) {
    return http.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email })
  }

  async resetPassword(token: string, password: string, passwordConfirmation: string) {
    return http.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
      token,
      password,
      password_confirmation: passwordConfirmation,
    })
  }

  async verifyEmail(token: string) {
    return http.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { token })
  }

  async getMe(token?: string) {
    return http.get<User>(AUTH_ENDPOINTS.ME, { token })
  }
}

export const authService = new AuthService()
export default authService