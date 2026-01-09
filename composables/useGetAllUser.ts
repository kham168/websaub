import { ref } from "vue";
import { GetAllUserService } from "~/services/api/getAllUser.service";
import type {
  GetAllUserResponse,
  GetAllUserItem,
} from "~/services/types/getAllUser-type";

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
      const response: GetAllUserResponse = await service.getAllUser(
        channel,
        token
      );

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

  return {
    getAllUser,
    loadings,
    errors,
    fetchAllUser,
  };
};
