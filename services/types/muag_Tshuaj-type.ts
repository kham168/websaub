export interface MuagTshuajItem {
  id: string;
  name: string;
  price1: string;
  price2: string | null;
  price3?: string | null;
  tel: string;
  detail: string;
  donation: string;
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
export interface TopData {
  Dormitory?: MuagTshuajItem[];
  House?: MuagTshuajItem[];
  Land?: MuagTshuajItem[];
  Taxi?: MuagTshuajItem[];
}
export interface ChannelDatas {
  qr: string;
  channelimage: string[];
  video1: string | null;
  video2: string | null;
  guidelinevideo: string | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface MuagTshuajResponse {
  rows: MuagTshuajItem[];
  pagination: Pagination;
  topData?: TopData;
  channelData?: ChannelDatas;
  qr?: Result;
  channelimage?: Result;
}
export interface MuagTshuajApiResponse {
  status: boolean;
  message: string;
  data: MuagTshuajResponse;
  topData?: TopData | null;
  channelData?: ChannelDatas | null;
  qr?: Result | null;
  channelimage?: Result | null;
}
export interface MuagTshuajServiceResponse {
  topData: TopData | null | any;
  pagination: Pagination | null;
  data: MuagTshuajItem[];
  channelData?: ChannelDatas | null | any;
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
