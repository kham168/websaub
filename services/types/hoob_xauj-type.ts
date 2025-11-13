export interface HOOB_XAUJ {
  id: string;
  name?: string;
  tel: string;
  contactnumber: string;
  province: string;
  district: string;
  villages: string[];
  image: string[];
  moredetail?: string;
  locationvideo?: string;
  cdate: string;
  path?: string;
}

// Dormitory specific interface
export interface Dormitory extends Omit<HOOB_XAUJ, "name"> {
  dormantalname?: string; // For rows array
  name?: string; // For topData
  price1: string;
  price2: string;
  price3: string;
  type: string;
  totalroom: string;
  activeroom: number;
  plan_on_next_month: string;
}

// House interface
export interface House extends HOOB_XAUJ {
  price1: string;
  price2: string;
  price3: string;
}

// Land interface
export interface Land extends HOOB_XAUJ {
  area: string;
  price: string;
  locationurl: string;
}

// Taxi interface
export interface Taxi extends HOOB_XAUJ {
  Price1: string;
  Price2: string;
  detail: string;
}

// Dormitory row with images field
export interface DormitoryRow extends Omit<Dormitory, "image"> {
  image: string; // Stringified array format
  images: string[]; // Parsed array
}

// Pagination interface
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Top data interface
export interface TopData {
  Dormitory: Dormitory[];
  House: House[];
  Land: Land[];
  Taxi: Taxi[];
}

// Main API response data
export interface ApiData {
  rows: DormitoryRow[];
  pagination: Pagination;
  topData: TopData;
}

// Complete API response
export interface ApiResponse {
  status: boolean;
  message: string;
  data: ApiData;
}
