import { ref } from "vue";
import { UpdateSendingOrderSellService } from "~/services/api/updateSendingOrderSell.service";
import type { UpdatePaddingOrderReviewResponse } from "~/services/types/updatePaddingOrderReView-type";
import { useProductOrderSellStore } from "~/stores/orderDetailCount";

const sellStore = useProductOrderSellStore();

export function useUpdateSendingOrderSell() {
  const loadings = ref(false);
  const updateSenndingsuccess = ref<UpdatePaddingOrderReviewResponse | null>(
    null
  );
  const errors = ref<string | null>(null);
  const token = useCookie<string>("token").value || "";
  const sellName = useCookie<string>("name").value || "";

  const service = new UpdateSendingOrderSellService();

  const updateSenddingStatus = async (
    orderId: string,
    sellStatus: number,
    sellComment: string,
    paymentMethod: number
  ) => {
    loadings.value = true;
    updateSenndingsuccess.value = null;
    errors.value = null;
    try {
      const res = await service.update(
        orderId,
        sellStatus,
        sellName,
        sellComment,
        paymentMethod,
        token
      );
      updateSenndingsuccess.value = res;
      await sellStore.fetchOrders(0, 0, 1000);

    } catch (err: any) {
      errors.value = err?.message || "Something went wrong";
    } finally {
      loadings.value = false;
    }
  };

  return {
    loadings,
    updateSenndingsuccess,
    errors,
    updateSenddingStatus,
  };
}
