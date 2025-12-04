import customerOrderService from "~/services/api/customerOrder.service";

export const useCustomerOrder = () => {
    const orderID = ref<string>("");
    const insertOrder = async (checkoutData: any, cartGroup: any, slipPayment: any) => {
      const formData = new FormData();
      const orderId = 'ORD' + Date.now();
      orderID.value = orderId;
  
      formData.append("id", orderId);
      formData.append("custname", checkoutData.name || "");
      formData.append("custTel", checkoutData.phoneNumber || "");
      formData.append("delivery", checkoutData.address || "");
      formData.append("shipping", checkoutData.shippingCompany || "");
      formData.append("custComment", checkoutData.notes || "");
  
      if (slipPayment?.file) {
        formData.append("files", slipPayment.file);
      }
  
      const groups = Object.values(cartGroup);
      const results: any[] = [];
  
      // REAL await-loops
      let items:any=null
      for ( items of groups) {
        for (const e of items) {
          formData.set("channel", e.channel || "1");
          formData.set("productId", e.id);
          formData.set("productName", e.creamname);
          formData.set("price", e.price);
          formData.set("qty", e.quantity);

//           const formDataObj = {};
// formData.forEach((value, key) => {
//   formDataObj[key] = value;
// });

// console.log("FORM DATA:", formDataObj);

  
          const resp = await customerOrderService.CustomerInsertOrder(formData);
  
          results.push(resp);
        }
      }
      console.log("ALL RESPONSES:", results);
  
      return results;
    };
  
    return { insertOrder , orderID};
  };
  