
import { ref } from "vue";
import { addUserService } from "@/services/api/addUser.service";

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
      const res = await addUserService.addUser(data,token);
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
