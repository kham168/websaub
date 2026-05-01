export const RETRIEVE_BYID_ENDPOINTS = {
  RETRIEVE_CHBYID: (id: string, page: number, limit: number) =>
    `/all/selectDataAll?channelId=${id}&page=${page}&limit=${limit}`,
} as const;
