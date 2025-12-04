// services/api/muag_tshuaj.service.ts
import { http } from "~/services/core/http.service";
import { MUAG_TSHUAJ_ENDPOINTS } from "~/services/endpoints/muag_Tshuaj.endpoint";
import type {
  MuagTshuajItem,
  MuagTshuajResponse,
  MuagTshuajApiResponse,
  MuagTshuajServiceResponse,
} from "../types/muag_Tshuaj-type";

class MuagTshuajService {
  async getAll(
    page: number = 0,
    limit: number = 10
  ): Promise<MuagTshuajServiceResponse> {
    try {
      const endpoint = MUAG_TSHUAJ_ENDPOINTS.Muag_Tshuaj(page, limit);

      const response = await http.get<
        MuagTshuajApiResponse | MuagTshuajResponse | MuagTshuajItem[]
      >(endpoint);

      let actualData: MuagTshuajResponse | null = null;

      if (this.isMuagTshuajResponse(response.data)) {
        actualData = response.data;
      } else if (this.isMuagTshuajApiResponse(response.data)) {
        actualData = response.data.data;
      } else if (Array.isArray(response.data)) {
        return {
          data: response.data,
          pagination: null,
          topData: response.result,
        };
      }

      if (!actualData || !actualData.rows || !Array.isArray(actualData.rows)) {
        return {
          data: [],
          pagination: null,
          topData: null,
        };
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
  private isMuagTshuajResponse(data: any): data is MuagTshuajResponse {
    return (
      typeof data === "object" &&
      data !== null &&
      "rows" in data &&
      Array.isArray(data.rows)
    );
  }

  private isMuagTshuajApiResponse(data: any): data is MuagTshuajApiResponse {
    return (
      typeof data === "object" &&
      data !== null &&
      "status" in data &&
      "data" in data &&
      "rows" in data.data &&
      Array.isArray(data.data.rows)
    );
  }
}

export const muagTshuajService = new MuagTshuajService();
export default MuagTshuajService;
