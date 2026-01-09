import {
  defineNuxtPlugin,
  addRouteMiddleware,
  defineNuxtRouteMiddleware,
} from "#app";

export default defineNuxtPlugin(() => {
  // Add global auth middleware
  addRouteMiddleware(
    "auth",
    defineNuxtRouteMiddleware((to, from) => {
      const token = useCookie("token").value;
      const isAdminRoute = to.path.startsWith("/admin");

      if (!token && isAdminRoute) {
        return navigateTo("/homepage"); // prevent access to admin
      }

      if (token && !isAdminRoute) {
        return navigateTo("/admin"); // redirect logged-in users to admin
      }

      // Otherwise allow navigation
      return;
    }),
    { global: true } // global middleware
  );
});
