import { http } from "./../core/http.service";
import { BRAND_CREAM_ENDPOINTS } from "../endpoints/brand_cream.endpoint";
import type {
  BrandCreamApiResponse,
  BrandCreamResponse,
  BrandCreamItem,
  BrandCreamServiceResponse,
} from "../types/brand_cream-type";

export class BrandCreamService {
  async getAll(
    page: number = 0,
    limit: number = 10
  ): Promise<BrandCreamServiceResponse> {
    try {
      const endpoint = BRAND_CREAM_ENDPOINTS.BRAND_CREAM(page, limit);

      const response = await http.get<
        BrandCreamApiResponse | BrandCreamResponse | BrandCreamItem[]
      >(endpoint);

      let actualData: BrandCreamResponse | null = null;

      if (this.isBrandCreamResponse(response.data)) {
        actualData = response.data;
      } else if (this.isBrandCreamApiResponse(response.data)) {
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
        channelimage: null,
        qr: null,
      };
    } catch (error) {
      throw error;
    }
  }

  private isBrandCreamResponse(data: any): data is BrandCreamResponse {
    return (
      data &&
      typeof data === "object" &&
      "rows" in data &&
      Array.isArray(data.rows)
    );
  }

  private isBrandCreamApiResponse(data: any): data is BrandCreamApiResponse {
    return (
      data &&
      typeof data === "object" &&
      "status" in data &&
      "data" in data &&
      data.data &&
      "rows" in data.data
    );
  }

  async getByName(name: string): Promise<BrandCreamItem | null> {
    const result = await this.getAll();
    return (
      result.data.find((item: BrandCreamItem) => item.creamname === name) ||
      null
    );
  }

  async getById(id: string): Promise<BrandCreamItem | null> {
    const result = await this.getAll();
    return result.data.find((item: BrandCreamItem) => item.id === id) || null;
  }
}

export const channelCreamService = new BrandCreamService();
export default channelCreamService;
