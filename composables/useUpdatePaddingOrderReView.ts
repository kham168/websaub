// composables/useUpdatePaddingOrderReView.ts
import { ref } from "vue";
import { UpdatePaddingOrderReviewService } from "~/services/api/updatePaddingOrderReView.service";
import type { UpdatePaddingOrderReviewResponse } from "~/services/types/updatePaddingOrderReView-type";
import { useOrderPaddingStore } from "~/stores/orderCount";
import { useProductOrderSellStore } from "~/stores/orderDetailCount";

const sellStore = useProductOrderSellStore();

const orderStore = useOrderPaddingStore();

export function useUpdatePaddingOrderReView() {
  const loadings = ref(false);
  const updatesuccess = ref<UpdatePaddingOrderReviewResponse | null>(null);
  const errors = ref<string | null>(null);
  const token = useCookie<string>("token").value || "";
  const service = new UpdatePaddingOrderReviewService();

  const updateOrderStatus = async (orderId: string, staffConfirm: boolean) => {
    loadings.value = true;
    updatesuccess.value = null;
    errors.value = null;
    try {
      const res = await service.update(orderId, staffConfirm, token);
      updatesuccess.value = res;
      // 🔥 refresh only total count
      await orderStore.fetchOrdersPadding(0, 0, 1000);
      await sellStore.fetchOrders(0, 0, 1000);
    } catch (err: any) {
      errors.value = err?.message || "Something went wrong";
    } finally {
      loadings.value = false;
    }
  };

  return {
    loadings,
    updatesuccess,
    errors,
    updateOrderStatus,
  };
}
