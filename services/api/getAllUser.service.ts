import { GET_ALL_USER_ENDPOINTS } from "../endpoints/getAllUser.endpoint";
import { http } from "../core/http.service";
import type { GetAllUserResponse } from "../types/getAllUser-type";

export class GetAllUserService {
  async getAllUser(
    Channel: string,
    token: string
  ): Promise<GetAllUserResponse> {
    try {
      const response = await http.get<GetAllUserResponse>(
        GET_ALL_USER_ENDPOINTS.GET_ALL_USER(Channel),
        { token }
      );

      return { data: response.data, result: response.result };
    } catch (error) {
      throw error;
    }
  }
}
