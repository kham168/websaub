// export default defineNuxtConfig({
//   compatibilityDate: '2025-05-15',
//   devtools: { enabled: true },
//   modules: ['@pinia/nuxt'],

//   app: {
//     head: {
//       link: [
//         { rel: "preconnect", href: "https://fonts.googleapis.com" },
//         { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
//         {
//           rel: "stylesheet",
//           href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
//         }
//       ]
//     }
//   },

//   css: ["assets/css/main.css"]
//   // pages: true,
// })
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],

  app: {
    head: {
      // 1. SET YOUR WEBSITE NAME HERE
      title: 'koosloos', 
      
      link: [
        // 2. SET YOUR IMAGE/ICON HERE
        // Make sure your image file is inside the "public" folder
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, 

        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        }
      ]
    }
  },

  css: ["assets/css/main.css"]
})