// services/api/auth.service.ts

import { http } from "../core/http.service";
import { Type_Cream_ENDPOINTS } from "../endpoints/type_Cream.endpoint";

class TypeCreamService {
  async typeCreamInsert(formData: FormData, token: string) {
    return http.upload(Type_Cream_ENDPOINTS.TYPE_CREAM, formData, { token });
  }
}
export const typeCreamService = new TypeCreamService();
export default typeCreamService;
