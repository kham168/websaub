import { http } from "./../core/http.service";
import { GET_ALL_PRODUCT_ORDER_SELL_ENDPOINTS } from "../endpoints/getAllProductOrderSell.endpoint";
import type {
  SelectAllCustomerOrderPaddingResponse,
  CustomerOrderPadding,
} from "../types/selectAllCustomerOrderPadding-type";

export class GetAllProductOrderSellService {
  async getAll(
    channel: string,
    status: number,
    page: number,
    limit: number,
    token?: string
  ): Promise<SelectAllCustomerOrderPaddingResponse> {
    try {
      const reps = await http.get<any>(
        GET_ALL_PRODUCT_ORDER_SELL_ENDPOINTS.GET_ALL_PRODUCT_ORDER_SELL(
          channel,
          status,
          page,
          limit
        ),
        { token }
      );

      if (Array.isArray(reps.data)) {
        return {
          status: true,
          message: "Success",
          data: reps.data as CustomerOrderPadding[],
          pagination: null,
        };
      }

      if (reps.data && typeof reps.data === "object" && "data" in reps.data) {
        return {
          status: reps.data.status ?? true,
          message: reps.data.message ?? "",
          data: reps.data.data ?? [],
          pagination: reps.data.pagination ?? null,
        };
      }

      return {
        status: false,
        message: "No data received",
        data: [],
        pagination: null,
      };
    } catch (error: any) {
      throw error;
    }
  }
}
