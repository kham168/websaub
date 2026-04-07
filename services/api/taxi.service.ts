// import { http } from "~/services/core/http.service";
// import { TAXI_ENDPOINTS } from "~/services/endpoints/taxi.endpoint";
// import type {
//   TaxiItem,
//   TaxiApiResponse,
//   TaxiServiceResponse,
//   TaxiResponse,
// } from "~/services/types/taxi-type";

// class TaxiService {
//   async getAll(
//     page: number = 0,
//     limit: number = 10
//   ): Promise<TaxiServiceResponse> {
//     try {
//       const endpoint = TAXI_ENDPOINTS.TAXI(page, limit);
//       const response = await http.get<any>(endpoint);
//       const apiResult =
//         response.result || response.data?.result || response.data;
//       if (!apiResult || typeof apiResult !== "object") {
//         return {
//           items: [],
//           pagination: null,
//           topData: null,
//         };
//       }
//       const items = Array.isArray(apiResult.data) ? apiResult.data : [];
//       const topData = apiResult.topData || null;
//       if (topData) {
//       }
//       const pagination = apiResult.pagination || null;
//       const result = {
//         items,
//         pagination,
//         topData,
//       };
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
// export const taxiService = new TaxiService();
// export default taxiService;
import { http } from "~/services/core/http.service";
import { TAXI_ENDPOINTS } from "~/services/endpoints/taxi.endpoint";
import type {
  TaxiServiceResponse,
} from "~/services/types/taxi-type";

class TaxiService {
  async getAll(
    page: number = 0,
    limit: number = 10
  ): Promise<any> { // Changed to any temporarily to allow video1/channelimage
    try {
      const endpoint = TAXI_ENDPOINTS.TAXI(page, limit);
      const response = await http.get<any>(endpoint);
      
      // Navigate to the actual data object
      const apiResult = response.result || response.data?.result || response.data;
      
      if (!apiResult || typeof apiResult !== "object") {
        return {
          items: [],
          pagination: null,
          topData: null,
          video1: null,
          channelimage: null
        };
      }

      // ✅ MAP EVERYTHING: items, pagination, AND the banner fields
      return {
        items: Array.isArray(apiResult.data) ? apiResult.data : [],
        pagination: apiResult.pagination || null,
        topData: apiResult.topData || null,
        // These come from the root of your JSON snippet provided earlier
        video1: apiResult.video1 || null,
        channelimage: apiResult.channelimage || null,
      };
    } catch (error) {
      console.error("TaxiService Error:", error);
      throw error;
    }
  }
}

export const taxiService = new TaxiService();
export default taxiService;