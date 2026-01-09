export interface SelectProductItem {
  channel: number;
  id: string;
  name: string;
  price1: string;
  price2: string;
  tel: string;
  detail: string;
  image: string[];
  status: string;
  donation: string;
  dntstartdate: string | null;
  dntenddate: string | null;
  cdate: string;
}

export interface SelectProductPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SelectProductResponse {
  status: boolean;
  message: string;
  data: SelectProductItem[];
  pagination: SelectProductPagination;
}
