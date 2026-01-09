import { ref } from "vue";
import { selectProductService } from "@/services/api/select_Product.service";
import type {
  SelectProductItem,
  SelectProductPagination,
} from "@/services/types/select_ProductShow-type";

export const useSelectProduct = () => {
  const selectProductsAll = ref<SelectProductItem[]>([]);
  const pagination = ref<SelectProductPagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const token = useCookie<string>("token").value;
  const channel = useCookie<string>("channel").value;

  const fetchSelectProducts = async (page = 0, limit = 50) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await selectProductService.getAll(
        channel,
        page,
        limit,
        token
      );
      // selectProductsAll.value = res.data.data;
      selectProductsAll.value = res.data?.data || res.data || [];
      pagination.value = res.data?.pagination || null;

      // pagination.value = res.data.pagination;
      console.log("Select Products fetched:", selectProductsAll.value);
    } catch (err: any) {
      error.value = err?.message || "Failed to load products";
    } finally {
      loading.value = false;
    }
  };

  return { selectProductsAll, pagination, loading, error, fetchSelectProducts };
};
