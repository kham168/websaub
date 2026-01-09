export const GET_ALL_PRODUCT_ORDER_SELL_ENDPOINTS = {
  GET_ALL_PRODUCT_ORDER_SELL: (
    channel: string,
    status: number,
    page: number,
    limit: number
  ) =>
    `/order/selectAllBySellStatus?channel=${channel}&status=${status}&page=${page}&limit=${limit}`,
};
