// ═══════════════════════════════════════════════════════════════
//  ALL API SERVICES — single source of truth
// ═══════════════════════════════════════════════════════════════

import { http } from "../core/http.service";
import { getFullUrl } from "../config/api.config";

import { ADD_USER_ENDPOINTS }                          from "../endpoints/addUser.endpoint";
import { AUTH_ENDPOINTS }                              from "../endpoints/auth.endpoint";
import { CHANNCEL_ENDPOINTS }                          from "../endpoints/channel.endpoint";
import { CUSTOMERORDER_ENDPOINTS }                     from "../endpoints/customerOrder.endpoint";
import { GET_ALL_PRODUCT_ORDER_SELL_ENDPOINTS }        from "../endpoints/getAllProductOrderSell.endpoint";
import { GET_ALL_USER_ENDPOINTS }                      from "../endpoints/getAllUser.endpoint";
import { GUIDELINE_VIDEO_ENDPOINTS }                   from "../endpoints/guidelineVideo.endpoint";
import { HISTORY_ALL_PRODUCT_SELL_ENDPOINTS }          from "../endpoints/historyAllProductSell.endpoint";
import { LOGIN_ENDPOINTS }                             from "../endpoints/login.endpoint";
import { PROFILE_IMAGE_ENDPOINTS }                     from "../endpoints/profileimage.endpoint";
import { RETRIEVE_BYID_ENDPOINTS }                     from "../endpoints/retrieve_Byid.endpoint";
import { Search_Customer_History_ENDPOINTS }           from "../endpoints/search_Customer_History.endpoint";
import { Select_Product_ENDPOINTS }                    from "../endpoints/selcet_Product.endpoint";
import { SELECT_ALL_CUSTOMER_ORDER_PADDING_ENDPOINTS } from "../endpoints/selectAllCustomerOrderPadding.endpoint";
import { Type_Cream_ENDPOINTS }                        from "../endpoints/type_Cream.endpoint";
import { TYPE_AMARANTHUS_ENDPOINTS }                   from "../endpoints/type_amaranthus.endpoint";
import { UPDATE_PADDING_ORDER_REVIEW_ENDPOINTS }       from "../endpoints/updatePaddingOrderReView.endpoint";
import { UPDATE_SENDING_ORDER_SELL_ENDPOINTS }         from "../endpoints/updateSendingOrderSell.endpoint";

import type {
  AddUserPayload,
  LoginPayload, LoginResponse,
  Channel,
  ProfilImageItem,
  GetAllUserResponse,
  SelectProductResponse,
  SelectAllCustomerOrderPaddingResponse, CustomerOrderPadding,
  SearchResponse,
  UpdatePaddingOrderReviewResponse,
} from "../types";

// ── AddUser ───────────────────────────────────────────────────
class AddUserService {
  async addUser(payload: AddUserPayload, token: string) {
    return http.post(ADD_USER_ENDPOINTS.ADD_USER, payload, { token });
  }
}
export const addUserService = new AddUserService();

// ── Auth ──────────────────────────────────────────────────────
class AuthService {
  async login(payload: { email: string; password: string }) {
    return http.post(AUTH_ENDPOINTS.LOGIN, payload);
  }
  async register(payload: { name: string; email: string; password: string; password_confirmation: string }) {
    return http.post(AUTH_ENDPOINTS.REGISTER, payload);
  }
  async logout(token?: string) {
    return http.post(AUTH_ENDPOINTS.LOGOUT, {}, { token });
  }
  async refreshToken(refreshToken: string) {
    return http.post(AUTH_ENDPOINTS.REFRESH_TOKEN, { refresh_token: refreshToken });
  }
  async forgotPassword(email: string) {
    return http.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
  }
  async resetPassword(token: string, password: string, passwordConfirmation: string) {
    return http.post(AUTH_ENDPOINTS.RESET_PASSWORD, { token, password, password_confirmation: passwordConfirmation });
  }
  async verifyEmail(token: string) {
    return http.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { token });
  }
  async getMe(token?: string) {
    return http.get(AUTH_ENDPOINTS.ME, { token });
  }
}
export const authService = new AuthService();

// ── Channel ───────────────────────────────────────────────────
class ChannelService {
  async channel() {
    return http.get<Channel>(CHANNCEL_ENDPOINTS.CHANNEL);
  }
  async getChannelId() {
    return http.get<Channel>(CHANNCEL_ENDPOINTS.CHANNEL);
  }
}
export const ChannelServices = new ChannelService();

// ── CustomerOrder ─────────────────────────────────────────────
class CustomerOrderService {
  async CustomerInsertOrder(formData: FormData) {
    return http.upload(CUSTOMERORDER_ENDPOINTS.INSERT, formData);
  }
}
export const customerOrderService = new CustomerOrderService();

// ── GetAllProductOrderSell ────────────────────────────────────
export class GetAllProductOrderSellService {
  async getAll(channel: string, status: number, page: number, limit: number, token?: string): Promise<SelectAllCustomerOrderPaddingResponse> {
    try {
      const reps = await http.get<any>(
        GET_ALL_PRODUCT_ORDER_SELL_ENDPOINTS.GET_ALL_PRODUCT_ORDER_SELL(channel, status, page, limit),
        { token }
      );
      if (Array.isArray(reps.data)) {
        return { status: true, message: "Success", data: reps.data as CustomerOrderPadding[], pagination: null };
      }
      if (reps.data && typeof reps.data === "object" && "data" in reps.data) {
        return { status: reps.data.status ?? true, message: reps.data.message ?? "", data: reps.data.data ?? [], pagination: reps.data.pagination ?? null };
      }
      return { status: false, message: "No data received", data: [], pagination: null };
    } catch (error: any) {
      throw error;
    }
  }
}

// ── GetAllUser ────────────────────────────────────────────────
export class GetAllUserService {
  async getAllUser(Channel: string, token: string): Promise<GetAllUserResponse> {
    try {
      const response = await http.get<GetAllUserResponse>(GET_ALL_USER_ENDPOINTS.GET_ALL_USER(Channel), { token });
      return { data: response.data, result: response.result };
    } catch (error) {
      throw error;
    }
  }
}

// ── HistoryAllProductSell ─────────────────────────────────────
export class HistoryAllProductSellService {
  async getAll(channel: string, page: number, limit: number, token?: string): Promise<SelectAllCustomerOrderPaddingResponse> {
    try {
      const reps = await http.get<any>(
        HISTORY_ALL_PRODUCT_SELL_ENDPOINTS.HISTORY_ALL_PRODUCT_SELL(channel, page, limit),
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      );
      if (Array.isArray(reps.data)) {
        return { message: "Success", data: reps.data as CustomerOrderPadding[], pagination: null };
      }
      if (reps.data && typeof reps.data === "object" && "data" in reps.data) {
        return { message: reps.data.message ?? "", data: reps.data.data ?? [], pagination: reps.data.pagination ?? null };
      }
      return { message: "No data received", data: [], pagination: null };
    } catch (error) {
      throw error;
    }
  }
}

// ── Login ─────────────────────────────────────────────────────
class LoginService {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await http.post<LoginResponse>(LOGIN_ENDPOINTS.LOGIN, payload);
    return { data: res.data, result: res.result };
  }
}
export const loginService = new LoginService();

// ── ProfileImage ──────────────────────────────────────────────
export const useProfileImageService = () => {
  const baseUrl = getFullUrl(PROFILE_IMAGE_ENDPOINTS.PROFILE_IMAGE);

  const getAllProfileImages = async (): Promise<ProfilImageItem[]> => {
    try {
      const response = await $fetch<{ status: boolean; message: string; data: ProfilImageItem[] }>(baseUrl, { method: "GET" });
      return response.data;
    } catch {
      return [];
    }
  };

  return { getAllProfileImages };
};

// ── RetrieveById ──────────────────────────────────────────────
class RetrieveByidService {
  async getRetrieveByid(id: string, page = 0, limit = 10) {
    try {
      const endpoint = RETRIEVE_BYID_ENDPOINTS.RETRIEVE_CHBYID(id, page, limit);
      return await http.get(endpoint);
    } catch (error) {
      throw error;
    }
  }
}
export const retrieveByidService = new RetrieveByidService();

// ── SearchCustomerHistory ─────────────────────────────────────
class SearchCustomerHistoryService {
  async searchByTel(tel: string, page?: number, limit?: number): Promise<SearchResponse> {
    try {
      const endpoint = Search_Customer_History_ENDPOINTS.SEARCH_CUSTOMER_HISTORY(tel, page, limit);
      const response = await http.get<SearchResponse>(endpoint);
      if (response && typeof response === "object") {
        const actual = (response as any).result || response;
        return {
          status: actual.status === true,
          message: actual.message || "Query successful",
          data: Array.isArray(actual.data) ? actual.data : [],
          pagination: actual.pagination || { page: 0, limit: 10, total: Array.isArray(actual.data) ? actual.data.length : 0, totalPages: 1 },
        };
      }
      return { status: false, message: "Invalid response format", data: [], pagination: { page: 0, limit: 10, total: 0, totalPages: 0 } };
    } catch (error: any) {
      return { status: false, message: error?.message || "Failed to search customer history", data: [], pagination: { page: 0, limit: 10, total: 0, totalPages: 0 } };
    }
  }
}
export const searchCustomerHistoryService = new SearchCustomerHistoryService();

// ── SelectAllCustomerOrderPadding ─────────────────────────────
export class SelectAllCustomerOrderPaddingService {
  async getAll(channel: string, status: number, page: number, limit: number, token?: string): Promise<SelectAllCustomerOrderPaddingResponse> {
    try {
      const reps = await http.get<any>(
        SELECT_ALL_CUSTOMER_ORDER_PADDING_ENDPOINTS.SELECT_ALL_CUSTOMER_ORDER_PADDING(channel, status, page, limit),
        { token }
      );
      if (Array.isArray(reps.data)) {
        return { status: true, message: "Success", data: reps.data as CustomerOrderPadding[], pagination: null };
      }
      if (reps.data && typeof reps.data === "object" && "data" in reps.data) {
        return { status: reps.data.status ?? true, message: reps.data.message ?? "", data: reps.data.data ?? [], pagination: reps.data.pagination ?? null };
      }
      return { status: false, message: "No data received", data: [], pagination: null };
    } catch (error: any) {
      throw error;
    }
  }
}

// ── SelectProduct ─────────────────────────────────────────────
class SelectProductService {
  async getAll(channel: string, page: number, limit: number, token?: string) {
    return http.get<SelectProductResponse>(Select_Product_ENDPOINTS.SELECT_PRODUCT(channel, page, limit), { token });
  }
}
export const selectProductService = new SelectProductService();

// ── TypeCream ─────────────────────────────────────────────────
class TypeCreamService {
  async typeCreamInsert(formData: FormData, token: string) {
    return http.upload(Type_Cream_ENDPOINTS.TYPE_CREAM, formData, { token });
  }
}
export const typeCreamService = new TypeCreamService();

// ── TypeAmaranthus ────────────────────────────────────────────
class TypeAmaranthusService {
  async getType_AmaranthusInsert(formData: FormData, token: string) {
    if (!token) throw new Error("Token is missing");
    return http.upload(TYPE_AMARANTHUS_ENDPOINTS.TYPE_AMARANTHUS, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
export const typeAmaranthusService = new TypeAmaranthusService();

// ── UpdatePaddingOrderReview ──────────────────────────────────
export class UpdatePaddingOrderReviewService {
  async update(orderId: string, staffConfirm: boolean, token: string): Promise<UpdatePaddingOrderReviewResponse> {
    try {
      const body = { orderId, staffConfirm: staffConfirm ? 1 : 0 };
      const response = await http.put(UPDATE_PADDING_ORDER_REVIEW_ENDPOINTS.UPDATE_PADDING_ORDER_REVIEW, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response as unknown as UpdatePaddingOrderReviewResponse;
    } catch (error) {
      throw error;
    }
  }
}

// ── UpdateSendingOrderSell ────────────────────────────────────
export class UpdateSendingOrderSellService {
  async update(orderId: string, sellStatus: number, sellName: string, sellComment: string, paymentMethod: number, token: string): Promise<UpdatePaddingOrderReviewResponse> {
    try {
      const body = { orderId, sellStatus: String(sellStatus), sellName, sellComment, paymentType: paymentMethod };
      const response = await http.put(UPDATE_SENDING_ORDER_SELL_ENDPOINTS.UPDATE_SENDING_ORDER_SELL, body, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      return response as unknown as UpdatePaddingOrderReviewResponse;
    } catch (error) {
      throw error;
    }
  }
}
