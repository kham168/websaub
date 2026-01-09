export const HISTORY_ALL_PRODUCT_SELL_ENDPOINTS = {
  HISTORY_ALL_PRODUCT_SELL: (channel: string, page: number, limit: number) =>
    `/order/selectAllOfStatusIsNot0?channel=${channel}&page=${page}&limit=${limit}`,
};
