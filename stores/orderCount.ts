import { defineStore } from "pinia";
import type { CustomerOrderPadding, Pagination } from "~/services/types";
import { SelectAllCustomerOrderPaddingService } from "~/services/api";

export const useOrderPaddingStore = defineStore("orderPadding", {
  state: () => ({
    orders: [] as CustomerOrderPadding[],
    pagination: null as Pagination | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    /** 🔥 Badge count comes ONLY from pagination.total */
    pendingOrderCount: (state) => {
      return state.pagination?.total ?? 0;
    },
  },

  actions: {
    async fetchOrdersPadding(status = 0, page = 0, limit = 10) {
      this.loading = true;
      this.error = null;

      try {
        const token = useCookie<string>("token").value;
        const channel = useCookie<string>("channel").value;

        const service = new SelectAllCustomerOrderPaddingService();
        const response = await service.getAll(
          channel,
          status,
          page,
          limit,
          token
        );

        if (response.status && Array.isArray(response.data)) {
          this.orders = response.data;
          this.pagination = response.pagination;
        } else {
          this.orders = [];
          this.pagination = null;
          this.error = "Invalid API response";
        }
      } catch (err: any) {
        this.orders = [];
        this.pagination = null;
        this.error =
          err.response?.data?.message || err.message || "Unexpected error";
      } finally {
        this.loading = false;
      }
    },
  },
});
