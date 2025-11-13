// services/endpoints/muag_Tshuaj.endpoint.ts

export const MUAG_TSHUAJ_ENDPOINTS = {
  Muag_Tshuaj: (page: number, limit: number) => `/tshuaj/selectAll?page=${page}&limit=${limit}`,
  MuagTshuajById: (id: string) => `/tshuaj/${id}`,
};