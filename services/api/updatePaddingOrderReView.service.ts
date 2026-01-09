import { http } from "../core/http.service";
import { UPDATE_PADDING_ORDER_REVIEW_ENDPOINTS } from "../endpoints/updatePaddingOrderReView.endpoint";

import type { UpdatePaddingOrderReviewResponse } from "../types/updatePaddingOrderReView-type";

export class UpdatePaddingOrderReviewService {
  async update(
    orderId: string,
    staffConfirm: boolean,
    token: string
  ): Promise<UpdatePaddingOrderReviewResponse> {
    try {
      const body = {
        orderId,
        staffConfirm: staffConfirm ? 1 : 0,
      };
      const response = await http.put(
        UPDATE_PADDING_ORDER_REVIEW_ENDPOINTS.UPDATE_PADDING_ORDER_REVIEW,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response as unknown as UpdatePaddingOrderReviewResponse;
    } catch (error) {
      throw error;
    }
  }
}
