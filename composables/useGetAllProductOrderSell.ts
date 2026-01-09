import { ref } from "vue";
import type {
  SelectAllCustomerOrderPaddingResponse,
  CustomerOrderPadding,
  Pagination,
} from "~/services/types/selectAllCustomerOrderPadding-type";
import { GetAllProductOrderSellService } from "~/services/api/getAllProductOrderSell.service";

export const useGetAllProductOrderSell = () => {
  const ordersProductSell = ref<CustomerOrderPadding[]>([]);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const token = useCookie<string>("token").value;
  const channel = useCookie<string>("channel").value;

  const fetchOrdersProductSell = async (status = 0, page = 0, limit = 100) => {
    loading.value = true;
    error.value = null;

    try {
      const services = new GetAllProductOrderSellService();
      const response = await services.getAll(
        channel,
        status,
        page,
        limit,
        token
      );

      if (response.status && Array.isArray(response.data)) {
        ordersProductSell.value = response.data;
        pagination.value = response.pagination;

        if (ordersProductSell.value.length === 0) {
          error.value = "No orders found";
        }
      } else {
        error.value = "Invalid response structure from API";
        ordersProductSell.value = [];
        pagination.value = null;
      }
    } catch (err: any) {
      error.value =
        err.response?.data?.message || err.message || "An error occurred";
      ordersProductSell.value = [];
      pagination.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    ordersProductSell,
    pagination,
    loading,
    error,
    fetchOrdersProductSell,
  };
};
