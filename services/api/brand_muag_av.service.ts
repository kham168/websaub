import { http } from "../core/http.service";
import { BRAND_MUAG_AV_ENDPOINTS } from "../endpoints/brand_muag_av.endpoint";
import type {
  BrandMuagAvResponse,
  BrandMuagAvApiResponse,
  BrandMuagAvItem,
  BrandMuagAvServiceResponse,
} from "../types/brand_muag_av-type";

export class BrandMuagAvService {
  async getAll(
    page: number = 0,
    limit: number = 10
  ): Promise<BrandMuagAvServiceResponse> {
    try {
      const endpoint = BRAND_MUAG_AV_ENDPOINTS.BRAND_MUAG_AV(page, limit);
      const response = await http.get<
        BrandMuagAvResponse | BrandMuagAvApiResponse | BrandMuagAvItem[]
      >(endpoint);

      let actualData: BrandMuagAvResponse | null = null;
      if (this.isBrandMuagAvResponse(response.data)) {
        actualData = response.data;
      } else if (this.isBrandMuagAvApiResponse(response.data)) {
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
          channelimage: null,
        };
      }
      return {
        data: actualData.rows,
        pagination: actualData.pagination || null,
        topData: actualData.topData || null,
        qr: actualData.qr || null,
        channelimage: actualData.channelimage || null,
      };
    } catch (error) {
      throw error;
    }
  }
  private isBrandMuagAvResponse(data: any): data is BrandMuagAvResponse {
    return (
      data &&
      typeof data === "object" &&
      "rows" in data &&
      Array.isArray(data.rows)
    );
  }
  private isBrandMuagAvApiResponse(data: any): data is BrandMuagAvApiResponse {
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
// Singleton instance
export const brandMuagAvService = new BrandMuagAvService();
export default brandMuagAvService;
