// import customerOrderService from "~/services/api/customerOrder.service";

// export const useCustomerOrder = () => {
//   const orderID = ref<string>("");
//   const channel = useCookie("channel");

//   const insertOrder = async (
//     checkoutData: any,
//     cartGroup: any,
//     slipPayment: any,
//     channel: string
//   ) => {
//     const orderId = "ORD" + Date.now();
//     orderID.value = orderId;

//     const formData = new FormData();

//     formData.append("id", orderId);
//     formData.append("channel", channel);
//     formData.append("custTel", checkoutData.phoneNumber || "");
//     formData.append("custComment", checkoutData.notes || "");
//     formData.append("delivery", checkoutData.address || "");
//     formData.append("shipping", checkoutData.shippingCompany || "");
//     formData.append("custName", checkoutData.custName || "");
//     if (slipPayment?.file) {
//       formData.append("files", slipPayment.file);
//     }

//     const groups = Object.values(cartGroup);
//     const productDetail: any[] = [];

//     for (const items of groups as any[]) {
//       for (const product of items) {
//         productDetail.push({
//           productid: product.id?.toString() || "",
//           productname: product.creamname || product.name || "",
//           image: Array.isArray(product.image) ? product.image[0] || "" : "",
//           price: Number(product.Price3 || product.price || product.Price1 || product.Price2) || 0,
//           qty: Number(product.quantity) || 1,
//         });
//       }
//     }

//     formData.append("productDetail", JSON.stringify(productDetail));

//     const formDataObj: any = {};
//     formData.forEach((value, key) => {
//       if (key === "productDetail") {
//         formDataObj[key] = JSON.parse(value as string);
//       } else {
//         formDataObj[key] = value;
//       }
//     });

//     try {
//       const resp = await customerOrderService.CustomerInsertOrder(formData);
//       return {
//         success: true,
//         orderId: orderId,
//         response: resp,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         orderId: orderId,
//         error: error,
//       };
//     }
//   };

//   return { insertOrder, orderID };
// };
import customerOrderService from "~/services/api/customerOrder.service";

export const useCustomerOrder = () => {
  const orderID = ref<string>("");

  // ── Strip non-numeric characters e.g. "40000kip" → 40000 ──────────────────
  const toNum = (val: any): number => {
    if (val === null || val === undefined || val === "") return 0;
    const cleaned = String(val).replace(/[^0-9.]/g, "");
    const n = Number(cleaned);
    return isNaN(n) ? 0 : n;
  };

  // ── Resolve correct selling price from item ────────────────────────────────
  // Priority: price3 (promo) → price2 (member) → price → price1 (full)
  const getItemPrice = (product: any): number => {
    if (toNum(product.price3) > 0) return toNum(product.price3);
    if (toNum(product.price2) > 0) return toNum(product.price2);
    if (toNum(product.price)  > 0) return toNum(product.price);
    if (toNum(product.price1) > 0) return toNum(product.price1);
    // fallback: try capitalized versions just in case
    if (toNum(product.Price3) > 0) return toNum(product.Price3);
    if (toNum(product.Price2) > 0) return toNum(product.Price2);
    if (toNum(product.Price1) > 0) return toNum(product.Price1);
    return 0;
  };

  const insertOrder = async (
    checkoutData: any,
    cartGroup: any,
    slipPayment: any,
    channel: string
  ) => {
    const orderId = "ORD" + Date.now();
    orderID.value = orderId;

    const formData = new FormData();

    formData.append("id", orderId);
    formData.append("channel", String(channel || ""));
    formData.append("custTel", checkoutData.phoneNumber || "");
    formData.append("custComment", checkoutData.notes || "");
    formData.append("delivery", checkoutData.address || "");
    formData.append("shipping", checkoutData.shippingCompany || "");
    formData.append("custName", checkoutData.custName || "");

    if (slipPayment?.file) {
      formData.append("files", slipPayment.file);
    }

    const groups = Object.values(cartGroup);
    const productDetail: any[] = [];

    for (const items of groups as any[]) {
      for (const product of items) {
        productDetail.push({
          productid:   String(product.id || product.productid || ""),
          productname: product.creamname || product.name || product.productname || "",
          image:       Array.isArray(product.image) ? product.image[0] || "" : product.image || "",
          price:       getItemPrice(product),   // ✅ correctly strips "kip" suffix
          qty:         Number(product.quantity) || 1,
        });
      }
    }

    formData.append("productDetail", JSON.stringify(productDetail));

    try {
      const resp = await customerOrderService.CustomerInsertOrder(formData);
      return {
        success: true,
        orderId:  orderId,
        response: resp,
      };
    } catch (error) {
      return {
        success: false,
        orderId: orderId,
        error:   error,
      };
    }
  };

  return { insertOrder, orderID };
};