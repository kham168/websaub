
  
  export interface UpdatePaddingOrderReviewItem {
    orderid: string;
    shipping: string;
    delivery: string;
    channel: number;
    custtel: string;
    custname: string;
    custcomment: string;
    paymentimage: string | null;
    cdate: string;
    staffconfirm: boolean;
    confirmdate: string;
    sellstatus: string;
    sellcomment: string | null;
    sellname: string | null;
    selldate: string | null;
    paymenttype: string;
  }
  
  export interface UpdatePaddingOrderReviewResponse {
    status: boolean;
    message: string;
    data: UpdatePaddingOrderReviewItem[];
  }