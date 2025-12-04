export default defineNuxtRouteMiddleware((to, from) => {
  
  const token = useCookie("token").value;

  const aa=ref('ddd')
  const test=aa.value

  // All admin pages start with /admin
  const isAdminRoute = to.path.startsWith("/admin");

  // If user is logged in and trying to access any non-admin page
  if (token && !isAdminRoute) {
    return navigateTo("/admin");
  }
});
