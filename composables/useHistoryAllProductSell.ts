import { ref } from "vue";
import type {
  CustomerOrderPadding,
  Pagination,
} from "~/services/types/selectAllCustomerOrderPadding-type";
import { HistoryAllProductSellService } from "~/services/api/historyAllProductSell.service";

export const useHistoryAllProductSell = () => {
  const historyProductSell = ref<CustomerOrderPadding[]>([]);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const token = useCookie<string>("token").value;
  const channel = useCookie<string>("channel").value;

  const fetchHistoryProductSell = async (page = 0, limit = 100) => {
    loading.value = true;
    error.value = null;

    try {
      const services = new HistoryAllProductSellService();
      const response = await services.getAll(channel, page, limit, token);

      if (response && Array.isArray(response.data)) {
        historyProductSell.value = response.data;
        pagination.value = response.pagination;

        if (historyProductSell.value.length === 0) {
          error.value = "No orders found";
        }
      } else {
        error.value = "Invalid response structure from API";
        historyProductSell.value = [];
        pagination.value = null;
      }
    } catch (err: any) {
      error.value =
        err.response?.data?.message || err.message || "An error occurred";
      historyProductSell.value = [];
      pagination.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    historyProductSell,
    pagination,
    loading,
    error,
    fetchHistoryProductSell,
  };
};
