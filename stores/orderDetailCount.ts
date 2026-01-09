import { defineStore } from "pinia";
import type {
  CustomerOrderPadding,
  Pagination,
} from "~/services/types/selectAllCustomerOrderPadding-type";
import { GetAllProductOrderSellService } from "~/services/api/getAllProductOrderSell.service";

export const useProductOrderSellStore = defineStore("orderSell", {
  state: () => ({
    ordersSell: [] as CustomerOrderPadding[],
    pagination: null as Pagination | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    pendingSellCount: (state) => {
      return state.pagination?.total ?? 0;
    },
  },

  actions: {
    async fetchOrders(status = 0, page = 0, limit = 10) {
      this.loading = true;
      this.error = null;

      try {
        const token = useCookie<string>("token").value;
        const channel = useCookie<string>("channel").value;

        const service = new GetAllProductOrderSellService();
        const response = await service.getAll(
          channel,
          status,
          page,
          limit,
          token
        );

        if (response.status && Array.isArray(response.data)) {
          this.ordersSell = response.data;
          this.pagination = response.pagination;
        } else {
          this.ordersSell = [];
          this.pagination = null;
          this.error = "Invalid API response structure";
        }
      } catch (err: any) {
        this.ordersSell = [];
        this.pagination = null;
        this.error =
          err.response?.data?.message || err.message || "Unexpected error";
      } finally {
        this.loading = false;
      }
    },

    /** 🔥 Call this after confirming / updating sell status */
    decreaseBadgeCount() {
      if (this.pagination && this.pagination.total > 0) {
        this.pagination.total--;
      }
      
    },
  },
});
