import { ref } from "vue";
import { loginService } from "@/services/api/login.service";

export function useLogin() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (data: { tel: string; password: string }) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await loginService.login(data);

      if (res.result.status && res.result.token) {
        const token = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });
        const channel = useCookie("channel", { maxAge: 60 * 60 * 24 * 7 });
        const id = useCookie("id", { maxAge: 60 * 60 * 24 * 7 });
        const name = useCookie("name", { maxAge: 60 * 60 * 24 * 7 });
        const type = useCookie("type", { maxAge: 60 * 60 * 24 * 7 });
        channel.value = res.data.channel;
        let ckChannel = 0;
        if (
          res.data.channel == "1" ||
          res.data.channel == "4" ||
          res.data.channel == "6"
        ) {
          ckChannel = 0;
        } else {
          ckChannel = 1;
        }
        useCookie<number>("chChannel", { maxAge: 60 * 60 * 24 * 7 }).value =
          ckChannel;
        id.value = res.data.id;
        name.value = res.data.name;
        type.value = res.data.type;
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
