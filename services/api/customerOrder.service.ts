// services/api/auth.service.ts

import { http } from "../core/http.service";
import { CUSTOMERORDER_ENDPOINTS } from "../endpoints/customerOrder.endpoint";

class CustomerOrderService {
  async CustomerInsertOrder(formData: FormData) {
    return http.upload(CUSTOMERORDER_ENDPOINTS.INSERT, formData);
  }
}

export const customerOrderService = new CustomerOrderService();
export default customerOrderService;
