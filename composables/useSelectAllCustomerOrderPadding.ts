import { ref } from "vue";
import type {
  CustomerOrderPadding,
  Pagination,
} from "~/services/types/selectAllCustomerOrderPadding-type";
import { SelectAllCustomerOrderPaddingService } from "~/services/api/selectAllCustomerOrderPadding.service";

export const useSelectAllCustomerOrderPadding = () => {
  const ordersPadding = ref<CustomerOrderPadding[]>([]);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const token = useCookie<string>("token").value;
  const channel = useCookie<string>("channel").value;

  const fetchOrdersPadding = async (status = 0, page = 0, limit = 100) => {
    loading.value = true;
    error.value = null;

    try {
      const services = new SelectAllCustomerOrderPaddingService();
      const response = await services.getAll(
        channel,
        status,
        page,
        limit,
        token
      );

      if (response.status && Array.isArray(response.data)) {
        ordersPadding.value = response.data;
        pagination.value = response.pagination;

        if (ordersPadding.value.length === 0) {
          error.value = "No orders found";
        }
      } else {
        error.value = "Invalid response structure from API";
        ordersPadding.value = [];
        pagination.value = null;
      }
    } catch (err: any) {
      error.value =
        err.response?.data?.message || err.message || "An error occurred";
      ordersPadding.value = [];
      pagination.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    ordersPadding,
    pagination,
    loading,
    error,
    fetchOrdersPadding,
  };
};
