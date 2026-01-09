export const SELECT_ALL_CUSTOMER_ORDER_PADDING_ENDPOINTS = {
  SELECT_ALL_CUSTOMER_ORDER_PADDING: (
    channel: string,
    status: number,
    page: number,
    limit: number
  ) =>
    `/order/selectAllByStaffStatus?channel=${channel}&status=${status}&page=${page}&limit=${limit}`, ///user/selectAllCustomerOrderPadding",
};
