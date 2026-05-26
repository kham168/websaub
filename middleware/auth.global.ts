export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token").value;
  const isAdminRoute = to.path.startsWith("/admin");

  // Unauthenticated user trying to reach admin → back to home
  if (!token && isAdminRoute) {
    return navigateTo("/");
  }

  // Logged-in user visiting home "/" → go to admin dashboard
  if (token && to.path === "/") {
    return navigateTo("/admin");
  }
});
