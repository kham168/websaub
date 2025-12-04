

export interface TaxiItem {
  id: string;
  name: string;
  price1: string;
  price2: string;
  tel: string;
  detail: string;
  province: string;
  district: string;
  villages: string[];
  image: string[];
  path?: string;
  cdate?: string;
}

export interface TopDataItem {
  channelid: String;
  id: string;
  name: string;
  price1?: string;
  price2?: string;
  price3?: string;
  type?: string;
  totalroom?: string;
  activeroom?: number;
  locationvideo?: string;
  locationurl?: string;
  tel: string;
  contactnumber?: string;
  moredetail?: string;
  detail?: string; // for Taxi items
  province: string;
  district: string;
  villages: string[];
  image: string[];
  plan_on_next_month?: string;
  path?: string;
  cdate?: string;
}

export interface TopData {
  Dormitory?: TopDataItem[];
  House?: TopDataItem[];
  Land?: TopDataItem[];
  Taxi?: TopDataItem[];
}

export interface PaginationItem {
  page: number;
  limit: number;
  total?: number;
  totalPages?: number;
}

// ✅ FIXED: This is what your backend returns
export interface TaxiResponse {
  rows: TaxiItem[];
  pagination: PaginationItem | null;
  topData: TopData | null;
}

// ✅ FIXED: This matches your actual API response structure
export interface TaxiApiResponse {
  status: boolean;
  message: string;
  data: TaxiItem[]; // ← Your API has items directly in data array
  pagination: PaginationItem; // ← pagination is at root level
  topData: TopData; // ← topData is at root level (lowercase 't')
}

export interface TaxiServiceResponse {
  items: TaxiItem[];
  topData: TopData | null;
  pagination: PaginationItem | null;
}