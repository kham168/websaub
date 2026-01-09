import { http } from "~/services/core/http.service";
import { Search_Customer_History_ENDPOINTS } from "~/services/endpoints/search_Customer_History.endpoint";
import type { SearchResponse } from "~/services/types/search_Customer-type";

class SearchCustomerHistoryService {
  async searchByTel(
    tel: string,
    page?: number,
    limit?: number
  ): Promise<SearchResponse> {
    try {
      const endpoint =
        Search_Customer_History_ENDPOINTS.SEARCH_CUSTOMER_HISTORY(
          tel,
          page,
          limit
        );
      const response = await http.get<SearchResponse>(endpoint);
      if (response && typeof response === "object") {
        const actualResponse = (response as any).result || response;
        return {
          status: actualResponse.status === true,
          message: actualResponse.message || "Query successful",
          data: Array.isArray(actualResponse.data) ? actualResponse.data : [],
          pagination: actualResponse.pagination || {
            page: 0,
            limit: 10,
            total: Array.isArray(actualResponse.data)
              ? actualResponse.data.length
              : 0,
            totalPages: 1,
          },
        };
      }
      return {
        status: false,
        message: "Invalid response format",
        data: [],
        pagination: {
          page: 0,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      };
    } catch (error: any) {
      return {
        status: false,
        message: error?.message || "Failed to search customer history",
        data: [],
        pagination: {
          page: 0,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      };
    }
  }
}

export const searchCustomerHistoryService = new SearchCustomerHistoryService();
export default searchCustomerHistoryService;
