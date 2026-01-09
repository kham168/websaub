// services/kho_Tsheb.service.ts
import { http } from "~/services/core/http.service";
import { KHO_TSHEB_ENDPOINTS } from "~/services/endpoints/kho_Tsheb.endpoint";
import type {
  KhoTshebApiResponse,
  KhoTshebResponse,
  KhoTshebItem,
  KhoTshebServiceResponse,
} from "~/services/types/kho_Tsheb-type";

class KhoTshebService {
  async getAll(
    page: number = 0,
    limit: number = 10
  ): Promise<KhoTshebServiceResponse> {
    try {
      const endpoint = KHO_TSHEB_ENDPOINTS.KHO_TSHEB(page, limit);
      const response = await http.get<
        KhoTshebApiResponse | KhoTshebResponse | KhoTshebItem[]
      >(endpoint);


      let actualData: KhoTshebResponse | null = null;
      if (this.isKhoTshebResponse(response.data)) {
        actualData = response.data;
      } else if (this.isKhoTshebApiResponse(response.data)) {
        actualData = response.data.data;
      } else if (Array.isArray(response.data)) {
        return {
          data: response.data,
          pagination: null,
          topData: response.result,
          qr: response.result,
          channelimage: response.result,
        };
      }
      if (!actualData || !actualData.rows || !Array.isArray(actualData.rows)) {
        return {
          data: [],
          pagination: null,
          topData: null,
          qr: null,
          channelimage: null
        };
      }
      return {
        data: actualData.rows,
        pagination: actualData.pagination || null,
        topData: actualData.topData || null,
        qr: actualData.qr || null,
        channelimage: actualData.channelimage || null
      };
    } catch (error) {
      throw error;
    }
  }
  private isKhoTshebResponse(data: any): data is KhoTshebResponse {
    return (
      data &&
      typeof data === "object" &&
      "rows" in data &&
      Array.isArray(data.rows)
    );
  }
  private isKhoTshebApiResponse(data: any): data is KhoTshebApiResponse {
    return (
      data &&
      typeof data === "object" &&
      "status" in data &&
      "data" in data &&
      data.data &&
      "rows" in data.data
    );
  }
}
export const khoTshebService = new KhoTshebService();
export default KhoTshebService;
