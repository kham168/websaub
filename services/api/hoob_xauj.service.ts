import { http } from "~/services/core/http.service";
import { HOOB_XAUJ_ENDPOINTS } from "~/services/endpoints/hoob_xauj.endpoint";
import type {
  HoobXaujApiResponse,
  HoobXaujResponse,
  HoobXaujItem,
  HoobXaujServiceResponse,
} from "~/services/types/hoob_xauj-type";

export class HoobXaujService {
  async getAll(
    page: number = 0,
    limit: number = 10
  ): Promise<HoobXaujServiceResponse> {
    try {
      const endpoint = HOOB_XAUJ_ENDPOINTS.HOOB_XAUJ(page, limit);
      const response = await http.get<
        HoobXaujApiResponse | HoobXaujResponse | HoobXaujItem[]
      >(endpoint);

      let actualData: HoobXaujResponse | null = null;
      if (this.isHoobXaujResponse(response.data)) {
        actualData = response.data;
      } else if (this.isHoobXaujApiResponse(response.data)) {
        actualData = response.data.data;
      } else if (Array.isArray(response.data)) {
        return {
          data: response.data,
          pagination: null,
          topData: response.result,
        };
      }

      if (!actualData || !actualData.rows) {
        return { data: [], pagination: null, topData: null };
      }

      return {
        data: actualData.rows,
        pagination: actualData.pagination || null,
        topData: actualData.topData || null,
      };
    } catch (error) {
      throw error;
    }
  }
  private isHoobXaujResponse(data: any): data is HoobXaujResponse {
    return (
      data &&
      typeof data === "object" &&
      "rows" in data &&
      Array.isArray(data.rows)
    );
  }

  private isHoobXaujApiResponse(data: any): data is HoobXaujApiResponse {
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

export const hoobXaujService = new HoobXaujService();
export default hoobXaujService;
