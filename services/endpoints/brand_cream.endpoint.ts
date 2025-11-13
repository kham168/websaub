

// brand_cream.service.ts or endpoints config
export const BRAND_CREAM_ENDPOINTS = {
    BRAND_CREAM: (page: number, limit: number) => `/cream/selectAll?page=${page}&limit=${limit}`,
    // GETID: (id: string) => `cream/getid/${id}`
}