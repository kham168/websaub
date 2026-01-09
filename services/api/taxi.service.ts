import { http } from "~/services/core/http.service";
import { TAXI_ENDPOINTS } from "~/services/endpoints/taxi.endpoint";
import type {
  TaxiItem,
  TaxiApiResponse,
  TaxiServiceResponse,
  TaxiResponse,
} from "~/services/types/taxi-type";

class TaxiService {
  async getAll(
    page: number = 0,
    limit: number = 10
  ): Promise<TaxiServiceResponse> {
    try {
      const endpoint = TAXI_ENDPOINTS.TAXI(page, limit);
      const response = await http.get<any>(endpoint);
      const apiResult =
        response.result || response.data?.result || response.data;
      if (!apiResult || typeof apiResult !== "object") {
        return {
          items: [],
          pagination: null,
          topData: null,
        };
      }
      const items = Array.isArray(apiResult.data) ? apiResult.data : [];
      const topData = apiResult.topData || null;
      if (topData) {
      }
      const pagination = apiResult.pagination || null;
      const result = {
        items,
        pagination,
        topData,
      };
      return result;
    } catch (error) {
      throw error;
    }
  }
}
export const taxiService = new TaxiService();
export default taxiService;
