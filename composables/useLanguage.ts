// composables/useLanguage.ts

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const useLanguage = () => {
  const currentLang = useState<string>("locale", () => "en");

  const translations: Translations = {
    en: {
      // App bar / nav
      home: "Home",
      tutorials: "Tutorials",
      support: "Support Us",
      history: "History",
      login: "Login",
      cart: "Cart",
      checkout: "Checkout",

      // Index page — banner
      no_media: "No media to display",

      // Index page — search bar
      search_label: "Search",
      select_province: "Select Province",
      select_district: "Select District",
      select_province_first: "Please select a province first",
      no_data: "No data",
      search_placeholder: "Search by name or phone...",
      ask_question: "Ask a Question",

      // Index page — product grid
      loading: "Loading data...",
      not_found: "No results found",
      not_found_hint: "Please try a different district or search term",
      clear_search: "Clear Search",
      price_label: "Product Price (Price)",
      discount: "Sale",
      no_detail: "No additional details",
      detail_btn: "Details",
      add_to_cart: "Add to Cart",

      // Index page — brand slider
      recommended_brands: "Other Recommended Brands",

      // Comment dialog
      comment_dialog_title: "Send an Enquiry",
      comment_subject: "Subject",
      comment_detail: "Details",
      comment_submit: "Submit",

      // Detail dialog
      detail_dialog_title: "Product Price (Price)",
      detail_desc: "Details",
      type_text: "Type",
      call_btn: "Call",

      // dialog
      shipping_company: "Shipping Company *",
      delivery_address: "Delivery Address *",
      delivery_address_placeholder: "Enter your full delivery address",
      your_name: "Please enter your name *",
      your_name_placeholder: "Your name",
      phone_number: "Phone Number *",
      phone_placeholder: "020 XXXX XXXX",
      notes: "Additional Notes (Optional)",
      notes_placeholder: "Any special delivery instructions?",
      cancel: "Cancel",
      confirm_order: "Confirm Order",
      // whatsapp
      whatsapp_title: "Send Order to WhatsApp",
      review_order: "Review your order details before sending to WhatsApp.",
      customer_info: "Customer Information",
      cust_name_label: "Name of Customer",
      phone_number_label: "Phone Number",
      shipping_company_label: "Shipping Company",
      delivery_address_label: "Delivery Address",
      notes_label: "Notes",
      your_order: "Your Order",
      items: "items",
      full_price: "Full-Price",
      price: "Price",
      qty: "Qty",
      subtotal: "Subtotal",
      upload_slip: "Upload Payment Slip",
      upload_slip_placeholder: "Upload slip image",
      remove_slip: "Remove Slip",
      grand_total: "Grand Total",
      total_items: "total items",
      close: "Close",
      send_whatsapp: "Send to WhatsApp",
      order_failed: "Order Failed",
      order_success: "Order Created Successfully!",
      order_id: "Order ID",
      unexpected_error: "Unexpected Error",
      close_dialog: "Close Dialog",
      slip_yes: "Payment Slip uploaded: Yes",
      slip_no: "Payment Slip uploaded: No",
      view_order: "View Order Details",
      // cart
      cart_empty: "Your cart is empty.",
      continue_shopping: "Continue Shopping",
      total: "Total",

    },

    lo: {
      // App bar / nav
      home: "ໜ້າຫຼັກ",
      tutorials: "ວິດີໂອແນະນຳ",
      support: "ສະໜັບສະໜູນພວກເຮົາ",
      history: "ປະຫວັດການສັ່ງຊື້",
      login: "ເຂົ້າສູ່ລະບົບ",
      cart: "ກະຕ່າ",
      checkout: "ຊຳລະເງິນ",

      // Index page — banner
      no_media: "ບໍ່ມີສື່ສຳລັບສະແດງ",

      // Index page — search bar
      search_label: "ຄົ້ນຫາ",
      select_province: "ເລືອກແຂວງ",
      select_district: "ເລືອກເມືອງ",
      select_province_first: "ກະລຸນາເລືອກແຂວງກ່ອນ",
      no_data: "ບໍ່ມີຂໍ້ມູນ",
      search_placeholder: "ຄົ້ນຫາຕາມຊື່ ຫຼື ເບີໂທ...",
      ask_question: "ສອບຖາມ",

      // Index page — product grid
      loading: "ກຳລັງໂຫລດຂໍ້ມູນ...",
      not_found: "ບໍ່ພົບຂໍ້ມູນ",
      not_found_hint: "ກະລຸນາລອງເລືອກເມືອງອື່ນ ຫຼື ຄົ້ນຫາດ້ວຍຄຳອື່ນ",
      clear_search: "ລ້າງການຄົ້ນຫາ",
      price_label: "ລາຄາສິນຄ້າ (Price)",
      discount: "ລົດ",
      no_detail: "ບໍ່ມີລາຍລະອຽດເພີ່ມເຕີມ",
      detail_btn: "ລາຍລະອຽດ",
      add_to_cart: "ເພີ່ມໃສ່ກະຕ່າ",

      // Index page — brand slider
      recommended_brands: "ແນະນຳເບຣນດອື່ນໆ",

      // Comment dialog
      comment_dialog_title: "ສົ່ງຂໍ້ຄວາມສອບຖາມ",
      comment_subject: "ຫົວຂໍ້ສອບຖາມ",
      comment_detail: "ລາຍລະອຽດ",
      comment_submit: "ສົ່ງຂໍ້ມູນ",

      // Detail dialog
      detail_dialog_title: "ລາຄາສິນຄ້າ (Price)",
      detail_desc: "ລາຍລະອຽດ",
      type_text: "ປະເພດ",
      call_btn: "ໂທຫາ",
      // dialog
      shipping_company: "ບໍລິສັດຂົນສົ່ງ *",
      delivery_address: "ທີ່ຢູ່ຈັດສົ່ງ *",
      delivery_address_placeholder: "ກະລຸນາໃສ່ທີ່ຢູ່ຈັດສົ່ງຂອງທ່ານ",
      your_name: "ກະລຸນາໃສ່ຊື່ຂອງທ່ານ *",
      your_name_placeholder: "ຊື່ຂອງທ່ານ",
      phone_number: "ເບີໂທລະສັບ *",
      phone_placeholder: "020 XXXX XXXX",
      notes: "ໝາຍເຫດເພີ່ມເຕີມ (ທາງເລືອກ)",
      notes_placeholder: "ຄຳແນະນຳການຈັດສົ່ງພິເສດ?",
      cancel: "ຍົກເລີກ",
      confirm_order: "ຢືນຢັນການສັ່ງຊື້",
      // whatsapp
      whatsapp_title: "ສົ່ງຄຳສັ່ງຊື້ໄປ WhatsApp",
      review_order: "ກວດສອບລາຍລະອຽດຄຳສັ່ງຊື້ກ່ອນສົ່ງໄປ WhatsApp.",
      customer_info: "ຂໍ້ມູນລູກຄ້າ",
      cust_name_label: "ຊື່ລູກຄ້າ",
      phone_number_label: "ເບີໂທລະສັບ",
      shipping_company_label: "ບໍລິສັດຂົນສົ່ງ",
      delivery_address_label: "ທີ່ຢູ່ຈັດສົ່ງ",
      notes_label: "ໝາຍເຫດ",
      your_order: "ຄຳສັ່ງຊື້ຂອງທ່ານ",
      items: "ລາຍການ",
      full_price: "ລາຄາເຕັມ",
      price: "ລາຄາ",
      qty: "ຈຳນວນ",
      subtotal: "ລວມຍ່ອຍ",
      upload_slip: "ອັບໂຫລດສະລິບການຊຳລະ",
      upload_slip_placeholder: "ອັບໂຫລດຮູບສະລິບ",
      remove_slip: "ລຶບສະລິບ",
      grand_total: "ລວມທັງໝົດ",
      total_items: "ລາຍການທັງໝົດ",
      close: "ປິດ",
      send_whatsapp: "ສົ່ງໄປ WhatsApp",
      order_failed: "ຄຳສັ່ງຊື້ລົ້ມເຫລວ",
      order_success: "ສ້າງຄຳສັ່ງຊື້ສຳເລັດ!",
      order_id: "ລະຫັດຄຳສັ່ງຊື້",
      unexpected_error: "ຂໍ້ຜິດພາດທີ່ບໍ່ຄາດຄິດ",
      close_dialog: "ປິດໜ້າຕ່າງ",
      slip_yes: "ອັບໂຫລດສະລິບການຊຳລະ: ແລ້ວ",
      slip_no: "ອັບໂຫລດສະລິບການຊຳລະ: ຍັງບໍ່ທັນ",
      view_order: "ເບິ່ງລາຍລະອຽດຄຳສັ່ງຊື້",
      // cart
      cart_empty: "ກະຕ່າຂອງທ່ານຫວ່າງເປົ່າ.",
      continue_shopping: "ສືບຕໍ່ຊື້ເຄື່ອງ",
      total: "ລວມ",
    },

    hmn: {
      // App bar / nav
      home: "Chaw Nyob",
      tutorials: "Kev Kawm",
      support: "Pab Peb",
      history: "Keeb Kwm",
      login: "Nkag Mus",
      cart: "Cov Khoom Koj Xav Tau Tag Nrho Muaj Li Hauv No",
      checkout: "Them Nyiaj",
      checkouts: "Teb Kom Tag Cov Lus Nug",

      // Index page — banner
      no_media: "Tsis muaj xov xwm los tso saib",

      // Index page — search bar
      search_label: "Nrhiav",
      select_province: "Xaiv Xeev",
      select_district: "Xaiv Nroog",
      select_province_first: "Thov xaiv xeev ua ntej",
      no_data: "Tsis muaj ntaub ntawv",
      search_placeholder: "Nrhiav los ntawm lub npe los yog xov tooj...",
      ask_question: "Nug Lus",

      // Index page — product grid
      loading: "Tab tom thauj ntaub ntawv...",
      not_found: "Tsis pom ntaub ntawv",
      not_found_hint: "Thov sim xaiv lwm nroog los yog nrhiav lwm lo lus",
      clear_search: "Tshem Kev Nrhiav",
      price_label: "Tus nqi (Price)",
      discount: "Txo",
      no_detail: "Tsis muaj ntaub ntawv ntxiv",
      detail_btn: "Cov ntsiab lus",
      add_to_cart: "xaiv rau lub tawb",

      // Index page — brand slider
      recommended_brands: "Lwm cov brand pom zoo",

      // Comment dialog
      comment_dialog_title: "Xa Lus Nug",
      comment_subject: "Lub ntsiab lus",
      comment_detail: "Cov ntsiab lus",
      comment_submit: "Xa",

      // Detail dialog
      detail_dialog_title: "Tus nqi (Price)",
      detail_desc: "Cov ntsiab lus",
      type_text: "Hom",
      call_btn: "Hu Xov Tooj",
      // dialog
      shipping_company: "Tuam Txhab Xa Khoom *",
      delivery_address: "Chaw txais Khoom *",
      delivery_address_placeholder: "Ntaus koj qhov chaw txais khoom ",
      your_name: " ntaus koj lub npe *",
      your_name_placeholder: "Koj lub npe",
      phone_number: "Lej Xov Tooj *",
      phone_placeholder: "020 XXXX XXXX",
      notes: "Lus Qhia Ntxiv (Xaiv Tau)",
      notes_placeholder: "Lus qhia tshwj xeeb rau kev xa khoom?",
      cancel: "Tshem Tawm",
      confirm_order: "Mus Ntxiv",
      // whatsapp
      whatsapp_title: "Xa Kev Txiav Txim Mus WhatsApp",
      review_order:
        "Xyuas koj cov ntsiab lus txiav txim ua ntej xa mus WhatsApp.",
      customer_info: "Cov Ntaub Ntawv Neeg Yuav",
      cust_name_label: "Lub Npe Neeg Yuav",
      phone_number_label: "Xov Tooj",
      shipping_company_label: "Tuam Txhab Xa Khoom",
      delivery_address_label: "Chaw Txais Khoom",
      notes_label: "Lus Qhia",
      your_order: "Koj Txoj Kev Txiav Txim",
      items: "cov khoom",
      full_price: "Tus Nqi Tag Nrho",
      price: "Tus Nqi",
      qty: "Ntau Npaum",
      subtotal: "Tus Nqi Ib Feem",
      upload_slip: "Thauj Daim Ntawv Them Nyiaj",
      upload_slip_placeholder: "Thauj daim duab slip",
      remove_slip: "Tshem Slip",
      grand_total: "Tus Nqi Tag Nrho",
      total_items: "cov khoom tag nrho",
      close: "Kaw",
      send_whatsapp: "Xa Mus WhatsApp",
      order_failed: "Txoj Kev Txiav Txim Tsis Ua Tiav",
      order_success: "Txoj Kev Txiav Txim Ua Tiav!",
      order_id: "Tus Lej Txiav Txim",
      unexpected_error: "Yuam Kev Tsis Xav Txog",
      close_dialog: "Kaw Lub Qhov Rais",
      slip_yes: "Daim Ntawv Them Nyiaj: Muaj",
      slip_no: "Daim Ntawv Them Nyiaj: Tsis Muaj",
      view_order: "Saib Cov Ntsiab Lus Txiav Txim",
      cart_empty: "Koj lub thawv khoob.",
      continue_shopping: "Mus Yuav Khoom Ntxiv",
      total: "Tus Nqi tag nrho",
    },
  };

  const t = (key: string): string => {
    return translations[currentLang.value]?.[key] || key;
  };

  const langs = [
    { title: "English", value: "en", flag: "🇺🇸" },
    { title: "ລາວ", value: "lo", flag: "🇱🇦" },
    { title: "Hmong", value: "hmn", flag: "🍥" },
  ];

  return {
    currentLang,
    t,
    langs,
  };
};
