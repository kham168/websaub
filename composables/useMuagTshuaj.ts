// composables/useMuagTshuaj.ts

import { muagTshuajService } from "~/services/api/muag_Tshuaj.service";
import type {
  MuagTshuajItem,
  MuagTshuajServiceResponse,
  TopDataItem,
  ChannelDatas,
} from "~/services/types/muag_Tshuaj-type";

export const useMuagTshuaj = () => {
  const allDataMuagTshuaj = ref<MuagTshuajItem[]>([]);
  const muagTshuaj = ref<MuagTshuajItem | null>(null);
  const topData = ref<any | null>(null);
  const channelData = ref<ChannelDatas | null>(null);
  const pagination = ref<any | null>(null);
  const channelimage = ref<any | null>(null);
  const qr = ref<any | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const fetchMuagTshuaj = async (page: number = 0, limit: number = 10) => {
    loading.value = true;
    error.value = null;

    try {
      const response: MuagTshuajServiceResponse =
        await muagTshuajService.getAll(page, limit);

      if (!response || !response.data || response.data.length === 0) {
        error.value = "No muag tshuaj data received.";
        muagTshuaj.value = null;
        allDataMuagTshuaj.value = [];
        pagination.value = null;
        topData.value = null;
        channelData.value = null;
        channelimage.value = null;
        qr.value = null;
        return;
      }
      const topDataResponse = response.topData.topData;
      const channelDataResponse = response.channelData.channelData;
      const qrResponse = response.qr.qr;
      const channelResponse = response.channelimage.channelimage;
      allDataMuagTshuaj.value = [...response.data];
      pagination.value = response.pagination;
      topData.value = topDataResponse;
      channelData.value = channelDataResponse;
      channelimage.value = channelResponse;
      qr.value = qrResponse;
      if (response.data.length > 0) {
        muagTshuaj.value = response.data[0];
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch muag tshuaj.";
      muagTshuaj.value = null;
      allDataMuagTshuaj.value = [];
      pagination.value = null;
      topData.value = null;
      channelData.value = null;
      channelimage.value = null;
      qr.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    allDataMuagTshuaj,
    muagTshuaj,
    channelData,
    topData,
    pagination,
    loading,
    error,
    channelimage,
    qr,
    fetchMuagTshuaj,
  };
};
