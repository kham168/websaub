export interface HoobXaujItem {
  id: string;
  name: string;
  totalRoom: number;
  activeRoom: number;
  price1: string;
  price2: string | null;
  price3: string | null;
  tel: string;
  detail: string;
  donation: string | null;
  image: string[];
  path?: string;
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
  Dormitory?: TopDataItem[];
  House?: TopDataItem[];
  Land?: TopDataItem[];
  Taxi?: TopDataItem[];
}

// Make topData optional to avoid TS errors when missing
export interface HoobXaujResponse {
  rows: HoobXaujItem[];
  pagination: PaginationData;
  topData?: TopData;
  qr?: Result;
  channelimage?: Result;
}

export interface HoobXaujApiResponse {
  status: boolean;
  message: string;
  data: HoobXaujResponse;
  topData: TopData | null;
  qr?: Result | null;
  channelimage?: Result | null;
}
export interface HoobXaujServiceResponse {
  data: HoobXaujItem[];
  pagination: PaginationData | null;
  topData?: TopData | null | any;
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
