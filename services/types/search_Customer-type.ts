// export interface OrderItem {
//   qty: string;
//   price: string;
//   productid: string;
//   productname: string;
// }

// export interface Order {
//   orderid: string;
//   shipping: string;
//   delivery: string;
//   channel: number;
//   custtel: string;
//   custname: string;
//   custcomment: string;
//   paymentimage: string | null;
//   cdate: string;
//   staffconfirm: string;
//   confirmdate: string | null;
//   sellstatus: string;
//   sellcomment: string | null;
//   sellname: string | null;
//   selldate: string | null;
//   productdetail: OrderItem[];
// }

// export interface SearchResponse {
//   status: boolean;
//   message: string;
//   data: Order[];
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   };
// }

// export interface ApiWrapperResponse {
//   data?: any[];
//   message: string;
//   status: number;
//   success: boolean;
//   result: SearchResponse;
//   pagination?: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   };
// }
export interface OrderItem {
  qty: string;
  price: string;
  image: string | null;
  productid: string;
  productname: string;
}

export interface Order {
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
  productdetail: OrderItem[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchResponse {
  status: boolean;
  message: string;
  data: Order[];
  pagination: Pagination;
}