export interface BrandCreamItem {
  id: string;
  creamname: string;
  price1: string;
  price2: string;
  price3: string;
  tel: string;
  detail: string;
  donation: string;
  image: string[];
  // qrimage: string
}

export interface TopDataItem {
  channelid: String;
  id: string;
  name: string;
  price1: string;
  price2: string | null;
  price3: string | null;
  tel: string;
  detail: string;
  donation: string | null;
  image: string[];
  path: string;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TopData {
  Cream?: TopDataItem[];
  KhoomKhoTsheb?: TopDataItem[];
  Muas?: TopDataItem[];
  Tshuaj?: TopDataItem[];
}

// Direct data structure (what axios returns after unwrapping)
export interface BrandCreamResponse {
  rows: BrandCreamItem[];
  pagination: PaginationData;
  topData?: TopData;
  // qrimage: string
}

// API Response when nested (with status/message wrapper)
export interface BrandCreamApiResponse {
  status: boolean;
  message: string;
  data: BrandCreamResponse;
  topData?: TopData | null;
  // qrimage: string
}

// Service return type
export interface BrandCreamServiceResponse {
  data: BrandCreamItem[];
  pagination: PaginationData | null;
  topData: TopData | null | any;
  // qrimage: string
}
