// import { http } from "~/services/core/http.service";
// import { RETRIEVE_BYID_ENDPOINTS } from "../endpoints/retrieve_Byid.endpoint";

// class RetrieveByidService {
 
//   async getRetrieveByid(id: string, page = 0, limit = 10) {
//     try {
//       const endpoint = RETRIEVE_BYID_ENDPOINTS.RETRIEVE_CHBYID(id, page, limit);
//       const response = await http.get(endpoint);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// export const retrieveByidService = new RetrieveByidService();
// export default retrieveByidService;
import { http } from "~/services/core/http.service";
import { RETRIEVE_BYID_ENDPOINTS } from "../endpoints/retrieve_Byid.endpoint";

class RetrieveByidService {
  async getRetrieveByid(id: string, page = 0, limit = 10) {
    try {
      // ໃຊ້ Endpoint ທີ່ທ່ານກໍານົດໄວ້
      const endpoint = RETRIEVE_BYID_ENDPOINTS.RETRIEVE_CHBYID(id, page, limit);
      console.log("📡 Calling API:=======", endpoint);
      const response = await http.get(endpoint);
      return response;
    } catch (error) {
      console.error("❌ Service Error:", error);
      throw error;
    }
  }
}

export const retrieveByidService = new RetrieveByidService();
export default retrieveByidService;