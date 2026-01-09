// import { http } from "~/services/core/http.service";
// import { TYPE_AMARANTHUS_ENDPOINTS } from "~/services/endpoints/type_amaranthus.endpoint";

// class Type_AmaranthusService {
//     async getType_AmaranthusInsert(formData: FormData,token: string) {
        
//         return http.upload(TYPE_AMARANTHUS_ENDPOINTS.TYPE_AMARANTHUS, formData, { token });
//     }
// }
// export const typeAmaranthusService = new Type_AmaranthusService();
// export default typeAmaranthusService;
import { http } from "~/services/core/http.service";
import { TYPE_AMARANTHUS_ENDPOINTS } from "~/services/endpoints/type_amaranthus.endpoint";

class TypeAmaranthusService {
  async getType_AmaranthusInsert(formData: FormData, token: string) {
    if (!token) {
      throw new Error("Token is missing");
    }

    return http.upload(
      TYPE_AMARANTHUS_ENDPOINTS.TYPE_AMARANTHUS,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // ❗ DO NOT set Content-Type manually
          // axios will set multipart boundary automatically
        },
      }
    );
  }
}

export const typeAmaranthusService = new TypeAmaranthusService();
export default typeAmaranthusService;
