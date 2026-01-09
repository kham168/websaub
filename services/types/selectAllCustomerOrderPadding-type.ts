export interface CustomerOrderPadding {
  orderid: string;
  shipping: string;
  delivery: string;
  channel: number;
  custtel: string;
  custname: string;
  custcomment: string;
  paymentimage: string | null;
  cdate: string;
  staffconfirm: string;
  confirmdate: string | null;
  sellstatus: string;
  sellcomment: string | null;
  sellname: string | null;
  selldate: string | null;
  productdetail: ProductDetail[];
}

export interface ProductDetail {
  qty: string;
  image: string | null;
  price: string;
  productid: string;
  productname: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface SelectAllCustomerOrderPaddingResponse {
  status?: boolean;
  message: string;
  data: CustomerOrderPadding[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}
