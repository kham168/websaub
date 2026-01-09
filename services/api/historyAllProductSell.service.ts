import { http } from "./../core/http.service";
import { HISTORY_ALL_PRODUCT_SELL_ENDPOINTS } from "../endpoints/historyAllProductSell.endpoint";
import type {
  SelectAllCustomerOrderPaddingResponse,
  CustomerOrderPadding,
} from "../types/selectAllCustomerOrderPadding-type";

export class HistoryAllProductSellService {
  async getAll(
    channel: string,
    page: number,
    limit: number,
    token?: string
  ): Promise<SelectAllCustomerOrderPaddingResponse> {
    try {
      const reps = await http.get<any>(
        HISTORY_ALL_PRODUCT_SELL_ENDPOINTS.HISTORY_ALL_PRODUCT_SELL(
          channel,
          page,
          limit
        ),
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );

      // 1️⃣ If API returns an array directly
      if (Array.isArray(reps.data)) {
        return {
          message: "Success",
          data: reps.data as CustomerOrderPadding[],
          pagination: null,
        };
      }

      // 2️⃣ If API returns an object with nested data
      if (reps.data && typeof reps.data === "object" && "data" in reps.data) {
        return {
          message: reps.data.message ?? "",
          data: reps.data.data ?? [],
          pagination: reps.data.pagination ?? null,
        };
      }

      // 3️⃣ Fallback
      return {
        message: "No data received",
        data: [],
        pagination: null,
      };
    } catch (error) {
      console.error("Error fetching history product sell:", error);
      throw error;
    }
  }
}
