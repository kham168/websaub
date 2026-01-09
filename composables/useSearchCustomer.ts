
import { ref } from "vue";
import { searchCustomerHistoryService } from "~/services/api/search_Customer_History.service";
import type { Order, SearchResponse } from "~/services/types/search_Customer-type";

export const useSearchCustomer = () => {
  const orders = ref<Order[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string>("");
  const searchedTel = ref<string>("");
  const hasSearched = ref<boolean>(false);

  const searchByTel = async (tel?: string, page?: number, limit?: number): Promise<void> => {
    // If no tel provided, just return
    if (!tel || tel.trim() === "") {
      error.value = "Please enter a phone number";
      return;
    }

    loading.value = true;
    error.value = "";
    orders.value = [];
    hasSearched.value = false;
    searchedTel.value = tel;

    try {

      const result: SearchResponse = await searchCustomerHistoryService.searchByTel(tel,page,limit);


      // Check if the API call was successful
      if (result.status === true) {
        orders.value = result.data || [];
        hasSearched.value = true;


        if (orders.value.length === 0) {
          error.value = `No orders found for: ${tel}`;
        }
      } else {
        // API returned status: false
        error.value = result.message || "Failed to fetch orders";
        orders.value = [];
        hasSearched.value = true;
      }
    } catch (err: any) {
      error.value = err?.message || "An error occurred while searching";
      orders.value = [];
      hasSearched.value = true;
    } finally {
      loading.value = false;
    }
  };

  const clearSearch = (): void => {
    orders.value = [];
    error.value = "";
    searchedTel.value = "";
    hasSearched.value = false;
  };

  return {
    orders,
    loading,
    error,
    searchedTel,
    hasSearched,
    searchByTel,
    clearSearch,
  };
};
