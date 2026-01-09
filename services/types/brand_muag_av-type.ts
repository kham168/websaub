export interface BrandMuagAvItem {
  id: string;
  name: string;
  price1: string;
  price2: string | null;
  price3: string | null;
  tel: string;
  detail: string;
  donation: string | null;
  image: string[];
  path?: string;
}

// Pagination info
export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Optional topData categories
export interface TopDataItem {
  channel: String;
  id: string;
  name: string;
  price1: string;
  price2: string | null;
  Price3: string | null;
  tel: string;
  detail: string;
  donation: string | null;
  image: string[];
  path: string;
}

// Categories container
export interface TopData {
  Dormitory?: TopDataItem[];
  House?: TopDataItem[];
  Land?: TopDataItem[];
  Taxi?: TopDataItem[];
  // [key: string]: TopDataItem[] | undefined  // for any other dynamic category
}

// API response structure for main data
export interface BrandMuagAvResponse {
  rows: BrandMuagAvItem[];
  pagination: PaginationData;
  topData?: TopData | null;
   qr?: Result;
    channelimage?: Result ;
}

// Full API response wrapper
export interface BrandMuagAvApiResponse {
  status: boolean;
  message: string;
  data: BrandMuagAvResponse;
  topData?: TopData | null;
   qr?: Result |  null;
    channelimage?: Result | null;
}

// Service return type (flattened)
export interface BrandMuagAvServiceResponse {
  data: BrandMuagAvItem[];
  pagination: PaginationData | null;
  topData: TopData | null | any;
  qr: Result | any | null;
  channelimage: Result | any | null;
}
export interface Result {
  qr: string;
  channelimage: string[];
  video1: string | null;
  video2: string | null;
  guidelinevideo: string | null;
}
