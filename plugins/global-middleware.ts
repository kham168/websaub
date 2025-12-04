// export default defineNuxtPlugin(() => {
//     addRouteMiddleware('auth', defineNuxtRouteMiddleware((to, from) => {
//       const publicRoutes = ['/'];
  
//       // Skip authentication check for public routes
//       if (publicRoutes.includes(to.path)) {
//         return;
//       }
  
//       // Redirect unauthenticated users to the login page
//       if (!isAuthenticated()) {
//         // return navigateTo('/');
//       }
//     }), { global: true }); // Mark this middleware as global
//   });
//  // plugins/global-middleware.ts
// // Authentication logic
// function isAuthenticated(): boolean {
//     // Example logic: Check for the presence of a cookie or token
//     const authToken = useCookie('token').value;
//     // console.log('Authentication token:', authToken); // Debugging log
//     return !!authToken; // Returns true if a valid token exists
//     // return false
//   }