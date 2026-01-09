import { http } from "../core/http.service";
import { ADD_USER_ENDPOINTS } from "@/services/endpoints/addUser.endpoint";
import type { AddUserPayload } from "../types/addUser-type";

class AddUserService {
  async addUser(payload: AddUserPayload,token: string) {
    return http.post(ADD_USER_ENDPOINTS.ADD_USER, payload,{token});
  }
}

export const addUserService = new AddUserService();
export default addUserService;
