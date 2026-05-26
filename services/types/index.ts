// ═══════════════════════════════════════════════════════════════
//  ALL TYPES — single source of truth
// ═══════════════════════════════════════════════════════════════

// ── Shared ────────────────────────────────────────────────────
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ── User & Auth ───────────────────────────────────────────────
export interface AddUserPayload {
  id?: number;
  tel: string;
  name: string;
  peopleId: string;
  type: string;
  password?: string;
  channel: string;
}
export interface AddUserResponse {
  status: boolean;
  message: string;
  data?: any;
}

export interface LoginPayload {
  tel: string;
  password: string;
}
export interface LoginUser {
  id: number;
  name: string;
  type: string;
  channel: number;
}
export interface LoginResponse {
  data?: any;
  result?: any;
}

export interface GetAllUserItem {
  id: number;
  tel: string;
  name: string;
  peopleid: string;
  type: string;
  channel: number;
  cdate: string;
}
export interface GetAllUserResponse {
  data: any;
  result?: any;
}

// ── Channel ───────────────────────────────────────────────────
export interface Channel {
  status: number;
  success: boolean;
  message: string;
  data?: ChannelData[];
}
export interface ChannelData {
  id: string;
  channel: string;
  detail: string;
  ownername: string;
  peopleintorm: string;
  tel: string;
  email: string;
  status: string;
  cdate: string;
  path: string;
  image_urls: string[];
}

// ── Profile Image ─────────────────────────────────────────────
export interface ProfilImageItem {
  id: string;
  housename: string;
  price1: string;
  price2: string;
  price3: string;
  tel: string;
  contactnumber: string;
  locationvideo: string;
  moredetail: string;
  province: string;
  district: string;
  villages: string[];
  image: string[];
  cdate: string;
}

// ── Guideline Video ───────────────────────────────────────────
export interface GuidelineVideo {
  id: string;
  detail: string;
  video: string;
  status: string;
}
export interface GuidelineVideoResponse {
  status: boolean;
  message: string;
  data: GuidelineVideo[];
}

// ── Products ──────────────────────────────────────────────────
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

// ── Retrieve Channel By ID ────────────────────────────────────
export interface DormitoryListing {
  channel: number;
  id: string;
  dormantalname: string;
  price1: string;
  price2: string;
  price3: string;
  type: string;
  totalroom: string;
  activeroom: number;
  locationvideo: string;
  tel: string;
  contactnumber: string;
  moredetail: string;
  province: string;
  district: string;
  villages: string[];
  image: string[];
  cdate: string;
}
export interface TopListing {
  channel: number;
  id: string;
  name: string;
  tel: string;
  contactnumber?: string;
  locationvideo?: string;
  locationurl?: string | null;
  moredetail?: string;
  detail?: string;
  province: string;
  district: string;
  villages: string[];
  image: string[];
  cdate: string;
  type?: string;
  totalroom?: string;
  activeroom?: number;
  plan_on_next_month?: string;
  area?: string;
}
export interface DormitoryListResponse {
  status: boolean;
  message: string;
  data: DormitoryListing[];
  pagination: Pagination;
  qr: string | null;
  imageadvert: string | null;
  video1: string | null;
  video2: string | null;
  guidelinevideo: string | null;
  topData: TopListing[];
}
export interface GetDormitoriesParams {
  page?: number;
  limit?: number;
  province?: string;
  district?: string;
  village?: string;
  type?: string;
  channel?: number;
}

// ── Orders ────────────────────────────────────────────────────
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
export interface SearchResponse {
  status: boolean;
  message: string;
  data: Order[];
  pagination: Pagination;
}

export interface ProductDetail {
  qty: string;
  image: string | null;
  price: string;
  productid: string;
  productname: string;
}
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
export interface SelectAllCustomerOrderPaddingResponse {
  status?: boolean;
  message: string;
  data: CustomerOrderPadding[];
  pagination: { page: number; limit: number; total: number; totalPages: number } | null;
}

// ── Update Orders ─────────────────────────────────────────────
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
