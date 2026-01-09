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
}

export interface TopDataItem {
  channel: String;
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
export interface BrandCreamResponse {
  rows: BrandCreamItem[];
  pagination: PaginationData;
  topData?: TopData;
  qr?: Result;
  channelimage?: Result;
}

export interface BrandCreamApiResponse {
  status: boolean;
  message: string;
  data: BrandCreamResponse;
  topData?: TopData | null;
  qr?: Result | null;
  channelimage?: Result | null;
}

export interface BrandCreamServiceResponse {
  data: BrandCreamItem[];
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
