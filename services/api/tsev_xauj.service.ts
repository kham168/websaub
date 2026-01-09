// services/tsev_xauj.service.ts
import { http } from "~/services/core/http.service";
import { TSEV_XAUJ_ENDPOINTS } from "~/services/endpoints/tsev_xauj.endpoint";
import type {
  HouseApiResponse,
  HouseResponse,
  HouseServiceResponse,
  HouseItem,
} from "~/services/types/tsev_xauj-type";

class TsevXaujService {
  async getAll(
    page: number = 0,
    limit: number = 50
  ): Promise<HouseServiceResponse> {
    try {
      const endpoint = TSEV_XAUJ_ENDPOINTS.TSEV_XAUJ(page, limit);
      const response = await http.get<
        HouseApiResponse | HouseResponse | HouseItem[]
      >(endpoint);
      let actualData: HouseResponse | null = null;

      if (this.isHouseResponse(response.data)) {
        actualData = response.data;
      } else if (this.isHouseApiResponse(response.data)) {
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
  private isHouseResponse(data: any): data is HouseResponse {
    return (
      data &&
      typeof data === "object" &&
      "rows" in data &&
      Array.isArray(data.rows)
    );
  }
  private isHouseApiResponse(data: any): data is HouseApiResponse {
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
export const tsevXaujService = new TsevXaujService();
export default TsevXaujService;
