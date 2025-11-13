// services/endpoints/taxi.endpoint.ts

export const TAXI_ENDPOINTS = {
    TAXI: (page: number, limit: number) => `/taxi/selectAll?page=${page}&limit=${limit}`,
    // TAXI_BY_ID: (id: string) => `/taxi/${id}`,
  };