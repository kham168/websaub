


// // // // export const useLogin = () => {
// // // //     const isLogin = ()=>{
// // // //         return localStorage.getItem('token')
// // // //     }
// // // //     return { isLogin }
// // // // }
// // // import { ref } from "vue";
// // // import { loginService } from "@/services/api/login.service";
// // // import type { LoginPayload, LoginResponse } from "@/services/types/login-type";
// // // import { API_CONFIG } from "@/services/config/api.config";

// // // export function useLogin() {
// // //   const loading = ref(false);
// // //   const error = ref<string | null>(null);
// // //   const user = ref<any>(null);

// // //   const login = async (payload: LoginPayload) => {
// // //     loading.value = true;
// // //     error.value = null;

// // //     try {
// // //       const response: LoginResponse = await loginService.login(payload);

// // //       if (response.status && response.token) {
// // //         // Save token in localStorage
// // //         localStorage.setItem(API_CONFIG.TOKEN_KEY, response.token);

// // //         // Save user info
// // //         user.value = response.data;

// // //         return true;
// // //       } else {
// // //         error.value = response.message || "Login failed";
// // //         return false;
// // //       }
// // //     } catch (err: any) {
// // //       error.value = err.response?.data?.message || "Login failed";
// // //       return false;
// // //     } finally {
// // //       loading.value = false;
// // //     }
// // //   };

// // //   return {
// // //     user,
// // //     loading,
// // //     error,
// // //     login,
// // //   };
// // // }
// // import { ref } from "vue";
// // import { loginService } from "@/services/api/login.service";

// // export function useLogin() {
// //   const loading = ref(false);
// //   const error = ref<string | null>(null);

// //   const login = async (payload: { tel: string; password: string }) => {
// //     loading.value = true;
// //     error.value = null;

// //     try {
// //       const response = await loginService.login(payload);

// //       if (!response.status) {
// //         error.value = response.message;
// //         return false;
// //       }

// //       // Save JWT token
// //       const token = useCookie("token");
// //       token.value = response.token;

// //       return true;
// //     } catch (err) {
// //       error.value = "Login failed";
// //       return false;
// //     } finally {
// //       loading.value = false;
// //     }
// //   };

// //   return {
// //     loading,
// //     error,
// //     login
// //   };
// // }
// import { ref } from "vue";
// import { loginService } from "@/services/api/login.service";
// import type { LoginPayload, LoginResponse } from "@/services/types/login-type";

// export function useLogin() {
//   const loading = ref(false);
//   const error = ref<string | null>(null);

//   const login = async (payload: LoginPayload) => {
//     loading.value = true;
//     error.value = null;

//     try {
//       const response: LoginResponse = await loginService.login(payload);

//       if (!response.status) {
//         error.value = response.message;
//         return false;
//       }

//       const token = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });
//       token.value = response.token;
//       console.log("Token set in cookie=========:", token.value);

//       return true;
//     } catch (err) {
//       error.value = "Login failed";
//       return false;
//     } finally {
//       loading.value = false;
//     }
//   };

//   return { loading, error, login };
// }

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

      // console.log("Token saved in cookie2222222:", res);
      if (res.result.status && res.result.token) {
        // ✅ Save token to cookie
        const token = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });
        const channel= useCookie("channel", { maxAge: 60 * 60 * 24 * 7 });
        const id= useCookie("id", { maxAge: 60 * 60 * 24 * 7 });
        const name= useCookie("name", { maxAge: 60 * 60 * 24 * 7 });
        const type= useCookie("type", { maxAge: 60 * 60 * 24 * 7 });
        channel.value = res.data.channel;
        let ckChannel=0;
        if(res.data.channel=='1'||res.data.channel=='4' || res.data.channel =='6' ){
          ckChannel=0
        }else{ckChannel=1}
        useCookie<number>("chChannel", { maxAge: 60 * 60 * 24 * 7 }).value = ckChannel;
        id.value = res.data.id;
        name.value = res.data.name;
        type.value = res.data.type;
        token.value = res.result.token;
        // console.log("Token saved in cookie:", token.value);
        // useCookie("token").value = token.token;

        loading.value = false;
        return true; // ✅ return true so handleSubmit knows login succeeded
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
