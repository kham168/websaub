export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token").value;

  const isAdminRoute = to.path.startsWith("/admin");

  // ================================
  // CASE 1: USER NOT LOGGED IN
  // ================================
  if (!token) {
    if (isAdminRoute) {
      return navigateTo("/homepage");
    }
    return; // allow default pages
  }

  // ================================
  // CASE 2: USER LOGGED IN
  // ================================
  if (token) {
    // user CANNOT access default pages
    if (!isAdminRoute) {
      return navigateTo("/admin");
    }

    // allow admin pages
    return;
  }
});
