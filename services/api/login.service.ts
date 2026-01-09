
import { http } from "../core/http.service";
import { LOGIN_ENDPOINTS } from "@/services/endpoints/login.endpoint";
import type { LoginPayload, LoginResponse } from "../types/login-type";

class LoginService {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await http.post<LoginResponse>(LOGIN_ENDPOINTS.LOGIN, payload);
    return {
        data: res.data,
        result: res.result,
    };
  }
}

export const loginService = new LoginService();
export default loginService;
