export const Select_Product_ENDPOINTS = {
  SELECT_PRODUCT: (channel: string, page: number, limit: number) =>
    `/user/selectProduct?channel=${channel}&page=${page}&limit=${limit}`,
};
