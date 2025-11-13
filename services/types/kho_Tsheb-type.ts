// kho_Tsheb-type.ts

export interface KhoTshebItem {
    id: string;
    name: string;
    Price1: string;
    Price2: string;
    tel: string;
    detail: string;
    donation: string;
    image: string[];
  }
  
  export interface TopDataItem {
    id: string;
    name: string;
    Price1: string;
    Price2: string | null;
    Price3?: string | null;
    tel: string;
    detail: string;
    donation: string | null;
    image: string[];
    path: string;
  }
  
  export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
  
  export interface TopData {
    Dormitory: TopDataItem[];
    House: TopDataItem[];
    Land: TopDataItem[];
    Taxi: TopDataItem[];
  }
  
  export interface KhoTshebResponse {
    status: boolean;
    message: string;
    data: KhoTshebItem[];
    pagination: Pagination;
    topData: TopData;
  }
  
  export interface KhoTshebQueryParams {
    page?: number;
    limit?: number;
  }