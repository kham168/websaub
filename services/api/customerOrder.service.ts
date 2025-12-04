// services/api/auth.service.ts

import { http } from '../core/http.service'
import { CUSTOMERORDER_ENDPOINTS } from '../endpoints/customerOrder.endpoint'
import type { Channel } from '../types/channel-type'


class CustomerOrderService {
  async CustomerInsertOrder (formData: FormData){
//     const formDataObj = {};
// formData.forEach((value, key) => {
//   formDataObj[key] = value;
// });

// console.log("FORM DATA233333:", formDataObj);
    // return http.post(CUSTOMERORDER_ENDPOINTS.INSERT)
    return http.upload(CUSTOMERORDER_ENDPOINTS.INSERT, formData);
  }
  
}

export const customerOrderService = new CustomerOrderService()
export default customerOrderService