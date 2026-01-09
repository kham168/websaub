// services/select-product.service.ts

import { http } from "@/services/core/http.service";
import { Select_Product_ENDPOINTS } from "@/services/endpoints/selcet_Product.endpoint";
import type { SelectProductResponse } from "@/services/types/select_ProductShow-type";

class SelectProductService {
  async getAll(channel: string, page: number, limit: number, token?: string) {
    return http.get<SelectProductResponse>(
      Select_Product_ENDPOINTS.SELECT_PRODUCT(channel, page, limit),
      { token }
    );
  }
}

export const selectProductService = new SelectProductService();
export default selectProductService;
