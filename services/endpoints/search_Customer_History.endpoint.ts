
export const Search_Customer_History_ENDPOINTS = {
    SEARCH_CUSTOMER_HISTORY: (tel:string, page?: number , limit?: number ) => `/order/searchByTel?tel=${tel}&page=${page}&limit=${limit}`,
  };