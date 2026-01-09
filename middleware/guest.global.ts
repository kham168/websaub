// export default defineNuxtRouteMiddleware((to, from) => {
  
//   const token = useCookie("token").value;

//   const aa=ref('ddd')
//   const test=aa.value

//   // All admin pages start with /admin
//   const isAdminRoute = to.path.startsWith("/admin");

//   // If user is logged in and trying to access any non-admin page
//   if (token && !isAdminRoute) {
//     return navigateTo("/admin");
//   }
// });
// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Get token from cookie
  const token = useCookie("token").value;

  // Check if the target route is an admin route
  const isAdminRoute = to.path.startsWith("/admin");

  // CASE 1: User not logged in
  if (!token) {
    if (isAdminRoute) {
      // Redirect unauthenticated user trying to access admin page
      return navigateTo("/homepage");
    }
    // Allow public pages
    return;
  }

  // CASE 2: User is logged in
  if (token) {
    if (!isAdminRoute) {
      // Redirect logged-in user from public pages to admin
      return navigateTo("/admin");
    }
    // Allow access to admin pages
    return;
  }
});
