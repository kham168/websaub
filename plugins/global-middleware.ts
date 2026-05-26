import {
  defineNuxtPlugin,
  addRouteMiddleware,
  defineNuxtRouteMiddleware,
} from "#app";

export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    "auth",
    defineNuxtRouteMiddleware((to) => {
      const token = useCookie("token").value;
      const isAdminRoute = to.path.startsWith("/admin");

      // Block unauthenticated access to admin
      if (!token && isAdminRoute) {
        return navigateTo("/");
      }

      // Logged-in user on home "/" → go to admin dashboard
      if (token && to.path === "/") {
        return navigateTo("/admin");
      }
    }),
    { global: true }
  );

  addRouteMiddleware(
    "guest",
    defineNuxtRouteMiddleware(() => {
      return;
    })
  );
});
