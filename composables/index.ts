// ═══════════════════════════════════════════════════════════════
//  ALL COMPOSABLES — single source of truth
// ═══════════════════════════════════════════════════════════════

import { ref, nextTick } from "vue";

import {
  addUserService,
  ChannelServices,
  customerOrderService,
  GetAllProductOrderSellService,
  GetAllUserService,
  HistoryAllProductSellService,
  loginService,
  useProfileImageService,
  retrieveByidService,
  searchCustomerHistoryService,
  selectProductService,
  SelectAllCustomerOrderPaddingService,
  typeAmaranthusService,
  typeCreamService,
  UpdatePaddingOrderReviewService,
  UpdateSendingOrderSellService,
} from "~/services/api";

import type {
  ChannelData,
  ProfilImageItem,
  GuidelineVideo, GuidelineVideoResponse,
  DormitoryListing, TopListing, Pagination,
  GetAllUserItem, GetAllUserResponse,
  CustomerOrderPadding,
  Order, SearchResponse,
  SelectProductItem, SelectProductPagination,
  UpdatePaddingOrderReviewResponse,
} from "~/services/types";

import { GUIDELINE_VIDEO_ENDPOINTS } from "~/services/endpoints/guidelineVideo.endpoint";
import { getFullUrl } from "~/services/config/api.config";

import { useOrderPaddingStore } from "~/stores/orderCount";
import { useProductOrderSellStore } from "~/stores/orderDetailCount";

// ── useAddUser ────────────────────────────────────────────────
export function useAddUser() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);
  const token = useCookie<string>("token").value;

  const addUser = async (data: any) => {
    loading.value = true;
    error.value = null;
    success.value = false;
    try {
      const res = await addUserService.addUser(data, token);
      if (res.status) {
        success.value = true;
      } else {
        error.value = res.message || "Failed to add user";
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else if (typeof err === "object" && err !== null && "response" in err) {
        // @ts-ignore
        error.value = err.response?.data?.message || "Unknown error";
      } else {
        error.value = "Unknown error";
      }
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, success, addUser };
}

// ── useChannel ────────────────────────────────────────────────
export const useChannel = () => {
  const channels = ref<ChannelData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchChannels = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await ChannelServices.channel();
      const dataArray = Array.isArray(response.data)
        ? response.data
        : response.data
        ? [response.data]
        : [];
      channels.value = dataArray.map((c: any) => ({
        ...c,
        title: c.title || c.channel || "Untitled Channel",
        image: c.image || [],
        price: c.price ?? 99,
        originalPrice: c.originalPrice ?? null,
        discount: c.discount ?? null,
        rating: c.rating ?? 4.5,
        reviewCount: c.reviewCount ?? 0,
        isBestSeller: c.isBestSeller ?? false,
        ownername: c.ownername || "No Name",
        email: c.email || "No Email",
        peopleInForm: c.peopleintorm || "No Info",
        tel: c.tel || "No Tel",
        status: c.status || "No Status",
        cdate: c.cdate || "",
      }));
    } catch (err: any) {
      error.value = err.message || "Failed to load channels";
      channels.value = [];
    } finally {
      loading.value = false;
    }
  };

  return { channels, loading, error, fetchChannels };
};

// ── useCustomerOrder ──────────────────────────────────────────
export const useCustomerOrder = () => {
  const orderID = ref<string>("");

  const toNum = (val: any): number => {
    if (val === null || val === undefined || val === "") return 0;
    const cleaned = String(val).replace(/[^0-9.]/g, "");
    const n = Number(cleaned);
    return isNaN(n) ? 0 : n;
  };

  const getItemPrice = (product: any): number => {
    if (toNum(product.price3) > 0) return toNum(product.price3);
    if (toNum(product.price2) > 0) return toNum(product.price2);
    if (toNum(product.price)  > 0) return toNum(product.price);
    if (toNum(product.price1) > 0) return toNum(product.price1);
    if (toNum(product.Price3) > 0) return toNum(product.Price3);
    if (toNum(product.Price2) > 0) return toNum(product.Price2);
    if (toNum(product.Price1) > 0) return toNum(product.Price1);
    return 0;
  };

  const insertOrder = async (checkoutData: any, cartGroup: any, slipPayment: any, channel: string) => {
    const orderId = "ORD" + Date.now();
    orderID.value = orderId;

    const formData = new FormData();
    formData.append("id", orderId);
    formData.append("channel", String(channel || ""));
    formData.append("custTel", checkoutData.phoneNumber || "");
    formData.append("custComment", checkoutData.notes || "");
    formData.append("delivery", checkoutData.address || "");
    formData.append("shipping", checkoutData.shippingCompany || "");
    formData.append("custName", checkoutData.custName || "");
    if (slipPayment?.file) formData.append("files", slipPayment.file);

    const productDetail: any[] = [];
    for (const items of Object.values(cartGroup) as any[]) {
      for (const product of items) {
        productDetail.push({
          productid:   String(product.id || product.productid || ""),
          productname: product.creamname || product.name || product.productname || "",
          image:       Array.isArray(product.image) ? product.image[0] || "" : product.image || "",
          price:       getItemPrice(product),
          qty:         Number(product.quantity) || 1,
        });
      }
    }
    formData.append("productDetail", JSON.stringify(productDetail));

    try {
      const resp = await customerOrderService.CustomerInsertOrder(formData);
      return { success: true, orderId, response: resp };
    } catch (error) {
      return { success: false, orderId, error };
    }
  };

  return { insertOrder, orderID };
};

// ── useGetAllProductOrderSell ─────────────────────────────────
export const useGetAllProductOrderSell = () => {
  const ordersProductSell = ref<CustomerOrderPadding[]>([]);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const token = useCookie<string>("token").value;
  const channel = useCookie<string>("channel").value;

  const fetchOrdersProductSell = async (status = 0, page = 0, limit = 100) => {
    loading.value = true;
    error.value = null;
    try {
      const services = new GetAllProductOrderSellService();
      const response = await services.getAll(channel, status, page, limit, token);
      if (response.status && Array.isArray(response.data)) {
        ordersProductSell.value = response.data;
        pagination.value = response.pagination;
        if (ordersProductSell.value.length === 0) error.value = "No orders found";
      } else {
        error.value = "Invalid response structure from API";
        ordersProductSell.value = [];
        pagination.value = null;
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || "An error occurred";
      ordersProductSell.value = [];
      pagination.value = null;
    } finally {
      loading.value = false;
    }
  };

  return { ordersProductSell, pagination, loading, error, fetchOrdersProductSell };
};

// ── useGetAllUser ─────────────────────────────────────────────
export const useGetAllUser = () => {
  const getAllUser = ref<GetAllUserItem[]>([]);
  const loadings = ref(false);
  const errors = ref<string | null>(null);
  const token = useCookie<string>("token").value;
  const channel = useCookie<string>("channel").value;

  const fetchAllUser = async () => {
    loadings.value = true;
    errors.value = null;
    try {
      const service = new GetAllUserService();
      const response: GetAllUserResponse = await service.getAllUser(channel, token);
      if (!response || !response.data || response.data.length === 0) {
        errors.value = "No data received";
        getAllUser.value = [];
        return;
      }
      getAllUser.value = [...response.data];
    } catch (err: any) {
      errors.value = err.message || "Failed to fetch data";
      getAllUser.value = [];
    } finally {
      loadings.value = false;
    }
  };

  return { getAllUser, loadings, errors, fetchAllUser };
};

// ── useGuidelineVideo ─────────────────────────────────────────
export const useGuidelineVideo = () => {
  const guidelineVideos = ref<GuidelineVideo[]>([]);
  const videoLoading = ref(false);
  const videoError = ref<string | null>(null);
  const currentVideo = ref<GuidelineVideo | null>(null);
  const playerLoading = ref(false);
  const playerError = ref(false);

  const extractYoutubeId = (rawUrl: string): string => {
    if (!rawUrl) return "";
    const cleanUrl = rawUrl.replace("https://service.tsheb.la/", "");
    const match = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([\w-]+)/);
    return match ? match[1] : "";
  };
  const getEmbedUrl = (rawUrl: string, muted = false): string => {
    const id = extractYoutubeId(rawUrl);
    if (!id) return "";
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&mute=${muted ? 1 : 0}&playsinline=1`;
  };
  const getYoutubeUrl = (rawUrl: string): string => {
    const id = extractYoutubeId(rawUrl);
    return id ? `https://www.youtube.com/watch?v=${id}` : "";
  };
  const playVideo = (video: GuidelineVideo): void => {
    currentVideo.value = null;
    playerLoading.value = true;
    playerError.value = false;
    setTimeout(() => {
      currentVideo.value = video;
      nextTick(() => {
        const cardText = document.querySelector(".video-tutorial-card .v-card-text");
        if (cardText) cardText.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          if (playerLoading.value) { playerLoading.value = false; playerError.value = true; }
        }, 8000);
      });
    }, 50);
  };
  const onPlayerLoaded = (): void => { playerLoading.value = false; playerError.value = false; };
  const onPlayerError  = (): void => { playerLoading.value = false; playerError.value = true; };

  const fetchGuidelineVideos = async (): Promise<void> => {
    videoLoading.value = true;
    videoError.value = null;
    try {
      const url = getFullUrl(GUIDELINE_VIDEO_ENDPOINTS.GET_ALL);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch videos: ${response.status}`);
      const result: GuidelineVideoResponse = await response.json();
      guidelineVideos.value = result.status && Array.isArray(result.data)
        ? result.data.filter((v) => v.status === "1")
        : [];
    } catch (err) {
      videoError.value = err instanceof Error ? err.message : "ເກີດຂໍ້ຜິດພາດໃນການໂຫລດວິດີໂອ";
    } finally {
      videoLoading.value = false;
    }
  };

  return { guidelineVideos, videoLoading, videoError, currentVideo, playerLoading, playerError, fetchGuidelineVideos, getEmbedUrl, getYoutubeUrl, extractYoutubeId, playVideo, onPlayerLoaded, onPlayerError };
};

// ── useHistoryAllProductSell ──────────────────────────────────
export const useHistoryAllProductSell = () => {
  const historyProductSell = ref<CustomerOrderPadding[]>([]);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const token = useCookie<string>("token").value;
  const channel = useCookie<string>("channel").value;

  const fetchHistoryProductSell = async (page = 0, limit = 100) => {
    loading.value = true;
    error.value = null;
    try {
      const services = new HistoryAllProductSellService();
      const response = await services.getAll(channel, page, limit, token);
      if (response && Array.isArray(response.data)) {
        historyProductSell.value = response.data;
        pagination.value = response.pagination;
        if (historyProductSell.value.length === 0) error.value = "No orders found";
      } else {
        error.value = "Invalid response structure from API";
        historyProductSell.value = [];
        pagination.value = null;
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || "An error occurred";
      historyProductSell.value = [];
      pagination.value = null;
    } finally {
      loading.value = false;
    }
  };

  return { historyProductSell, pagination, loading, error, fetchHistoryProductSell };
};

// ── useLogin ──────────────────────────────────────────────────
export function useLogin() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (data: { tel: string; password: string }) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await loginService.login(data);
      if (res.result.status && res.result.token) {
        const token   = useCookie("token",   { maxAge: 60 * 60 * 24 * 7 });
        const channel = useCookie("channel", { maxAge: 60 * 60 * 24 * 7 });
        const id      = useCookie("id",      { maxAge: 60 * 60 * 24 * 7 });
        const name    = useCookie("name",    { maxAge: 60 * 60 * 24 * 7 });
        const type    = useCookie("type",    { maxAge: 60 * 60 * 24 * 7 });
        channel.value = res.data.channel;
        const ckChannel = ["1", "4", "6"].includes(res.data.channel) ? 0 : 1;
        useCookie<number>("chChannel", { maxAge: 60 * 60 * 24 * 7 }).value = ckChannel;
        id.value    = res.data.id;
        name.value  = res.data.name;
        type.value  = res.data.type;
        token.value = res.result.token;
        loading.value = false;
        return true;
      } else {
        error.value = res.result.message || "Login failed";
        loading.value = false;
        return false;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        // @ts-ignore
        error.value = err.response?.data?.message || "Unknown error";
      }
      loading.value = false;
      return false;
    }
  };

  return { login, loading, error };
}

// ── useProfileImage ───────────────────────────────────────────
export const useProfileImage = () => {
  const service = useProfileImageService();
  const profileImageitems = ref<ProfilImageItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProfileImages = async () => {
    loading.value = true;
    error.value = null;
    try {
      profileImageitems.value = await service.getAllProfileImages();
    } catch (err: any) {
      error.value = err.message || "Failed to load profile images";
    } finally {
      loading.value = false;
    }
  };

  return { profileImageitems, loading, error, fetchProfileImages };
};

// ── useGetChannelById ─────────────────────────────────────────
export const useGetChannelById = () => {
  const channels  = ref<DormitoryListing[]>([]);
  const topData   = ref<TopListing[] | null>(null);
  const pagination = ref<Pagination | null>(null);
  const qr        = ref<string | null>(null);
  const channelimage = ref<string | string[] | null>(null);
  const video1    = ref<string | null>(null);
  const loadings  = ref(false);
  const errors    = ref<string | null>(null);

  const fetchChannelById = async (id: string, page = 0, limit = 10) => {
    if (!id) { console.warn("⚠️ fetchChannelById: Missing ID"); return; }
    loadings.value = true;
    errors.value = null;
    try {
      const response = await retrieveByidService.getRetrieveByid(id, page, limit) as any;
      if (!response) throw new Error("Empty response from server");
      const rawData = response.data?.data || response.data || [];
      channels.value = Array.isArray(rawData) ? rawData : [];
      const meta = response.result || response;
      qr.value           = meta.qr || null;
      channelimage.value = meta.channelimage || meta.imageadvert || null;
      video1.value       = meta.video1 || null;
      topData.value      = meta.topData || null;
      pagination.value   = response.pagination || null;
    } catch (err: any) {
      errors.value = err.message || "Connection Error";
      channels.value = [];
    } finally {
      loadings.value = false;
    }
  };

  return { channels, topData, pagination, qr, channelimage, video1, loadings, errors, fetchChannelById };
};

// ── useSearchCustomer ─────────────────────────────────────────
export const useSearchCustomer = () => {
  const orders = ref<Order[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string>("");
  const searchedTel = ref<string>("");
  const hasSearched = ref<boolean>(false);

  const searchByTel = async (tel?: string, page?: number, limit?: number): Promise<void> => {
    if (!tel || tel.trim() === "") { error.value = "Please enter a phone number"; return; }
    loading.value = true;
    error.value = "";
    orders.value = [];
    hasSearched.value = false;
    searchedTel.value = tel;
    try {
      const result: SearchResponse = await searchCustomerHistoryService.searchByTel(tel, page, limit);
      if (result.status === true) {
        orders.value = result.data || [];
        hasSearched.value = true;
        if (orders.value.length === 0) error.value = `No orders found for: ${tel}`;
      } else {
        error.value = result.message || "Failed to fetch orders";
        orders.value = [];
        hasSearched.value = true;
      }
    } catch (err: any) {
      error.value = err?.message || "An error occurred while searching";
      orders.value = [];
      hasSearched.value = true;
    } finally {
      loading.value = false;
    }
  };

  const clearSearch = (): void => {
    orders.value = [];
    error.value = "";
    searchedTel.value = "";
    hasSearched.value = false;
  };

  return { orders, loading, error, searchedTel, hasSearched, searchByTel, clearSearch };
};

// ── useSelectProduct ──────────────────────────────────────────
export const useSelectProduct = () => {
  const selectProductsAll = ref<SelectProductItem[]>([]);
  const pagination = ref<SelectProductPagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const token = useCookie<string>("token").value;
  const channel = useCookie<string>("channel").value;

  const fetchSelectProducts = async (page = 0, limit = 50) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await selectProductService.getAll(channel, page, limit, token);
      selectProductsAll.value = res.data?.data || res.data || [];
      pagination.value = res.data?.pagination || null;
    } catch (err: any) {
      error.value = err?.message || "Failed to load products";
    } finally {
      loading.value = false;
    }
  };

  return { selectProductsAll, pagination, loading, error, fetchSelectProducts };
};

// ── useSelectAllCustomerOrderPadding ──────────────────────────
export const useSelectAllCustomerOrderPadding = () => {
  const ordersPadding = ref<CustomerOrderPadding[]>([]);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const token = useCookie<string>("token").value;
  const channel = useCookie<string>("channel").value;

  const fetchOrdersPadding = async (status = 0, page = 0, limit = 100) => {
    loading.value = true;
    error.value = null;
    try {
      const services = new SelectAllCustomerOrderPaddingService();
      const response = await services.getAll(channel, status, page, limit, token);
      if (response.status && Array.isArray(response.data)) {
        ordersPadding.value = response.data;
        pagination.value = response.pagination;
        if (ordersPadding.value.length === 0) error.value = "No orders found";
      } else {
        error.value = "Invalid response structure from API";
        ordersPadding.value = [];
        pagination.value = null;
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || "An error occurred";
      ordersPadding.value = [];
      pagination.value = null;
    } finally {
      loading.value = false;
    }
  };

  return { ordersPadding, pagination, loading, error, fetchOrdersPadding };
};

// ── useTypeAmaranthu ──────────────────────────────────────────
export const useTypeAmaranthu = () => {
  const token = useCookie<string>("token").value;

  const TypeAmaranthusItemInsert = async (data: any, files: File[]) => {
    const channel = useCookie("channel").value;
    const formData = new FormData();
    const id = "PRD" + Date.now();
    formData.append("id", id);
    formData.append("channel", channel as string);
    formData.append("name", data.name);
    formData.append("price1", data.price1);
    formData.append("price2", data.price2);
    formData.append("price3", data.price3);
    formData.append("moreDetail", data.moredetail);
    formData.append("type", data.type);
    formData.append("totalRoom", data.totalRoom);
    formData.append("activeRoom", data.activeroom);
    formData.append("locationvideo", data.locationvideo);
    formData.append("contactnumber", data.contactnumber);
    formData.append("province", data.province);
    formData.append("district", data.district);
    formData.append("village", data.village);
    formData.append("area", data.area);
    formData.append("tel", data.phone);
    files.forEach((file) => formData.append("files", file));
    const resp = await typeAmaranthusService.getType_AmaranthusInsert(formData, token);
    return resp.success;
  };

  return { TypeAmaranthusItemInsert };
};

// ── useTypeCream ──────────────────────────────────────────────
export const useTypeCream = () => {
  const token = useCookie<string>("token").value;

  const typeCreamServiceInstance = async (data: any, files: File[]) => {
    const channel = useCookie("channel").value;
    const formData = new FormData();
    const id = "PRD" + Date.now();
    formData.append("id", id);
    formData.append("channel", channel as string);
    formData.append("bland", data.type);
    formData.append("name", data.name);
    formData.append("price1", data.price1);
    formData.append("price2", data.price2);
    formData.append("detail", data.description);
    formData.append("tel", data.phone);
    files.forEach((file) => formData.append("files", file));
    const resp = await typeCreamService.typeCreamInsert(formData, token);
    return resp.success;
  };

  return { typeCreamServiceInstance };
};

// ── useUpdatePaddingOrderReView ───────────────────────────────
export function useUpdatePaddingOrderReView() {
  const loadings = ref(false);
  const updatesuccess = ref<UpdatePaddingOrderReviewResponse | null>(null);
  const errors = ref<string | null>(null);
  const token = useCookie<string>("token").value || "";
  const service = new UpdatePaddingOrderReviewService();

  const updateOrderStatus = async (orderId: string, staffConfirm: boolean) => {
    loadings.value = true;
    updatesuccess.value = null;
    errors.value = null;
    try {
      const res = await service.update(orderId, staffConfirm, token);
      updatesuccess.value = res;
      const orderStore = useOrderPaddingStore();
      const sellStore  = useProductOrderSellStore();
      await orderStore.fetchOrdersPadding(0, 0, 1000);
      await sellStore.fetchOrders(0, 0, 1000);
    } catch (err: any) {
      errors.value = err?.message || "Something went wrong";
    } finally {
      loadings.value = false;
    }
  };

  return { loadings, updatesuccess, errors, updateOrderStatus };
}

// ── useUpdateSendingOrderSell ─────────────────────────────────
export function useUpdateSendingOrderSell() {
  const loadings = ref(false);
  const updateSenndingsuccess = ref<UpdatePaddingOrderReviewResponse | null>(null);
  const errors = ref<string | null>(null);
  const token    = useCookie<string>("token").value || "";
  const sellName = useCookie<string>("name").value  || "";
  const service  = new UpdateSendingOrderSellService();

  const updateSenddingStatus = async (orderId: string, sellStatus: number, sellComment: string, paymentMethod: number) => {
    loadings.value = true;
    updateSenndingsuccess.value = null;
    errors.value = null;
    try {
      const res = await service.update(orderId, sellStatus, sellName, sellComment, paymentMethod, token);
      updateSenndingsuccess.value = res;
      const sellStore = useProductOrderSellStore();
      await sellStore.fetchOrders(0, 0, 1000);
    } catch (err: any) {
      errors.value = err?.message || "Something went wrong";
    } finally {
      loadings.value = false;
    }
  };

  return { loadings, updateSenndingsuccess, errors, updateSenddingStatus };
}
