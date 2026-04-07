import customerOrderService from "~/services/api/customerOrder.service";

export const useCustomerOrder = () => {
  const orderID = ref<string>("");
  const channel = useCookie("channel");

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
    formData.append("channel", channel);
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
          productid: product.id?.toString() || "",
          productname: product.creamname || product.name || "",
          image: Array.isArray(product.image) ? product.image[0] || "" : "",
          price: Number(product.Price3 || product.price || product.Price1) || 0,
          qty: Number(product.quantity) || 1,
        });
      }
    }

    formData.append("productDetail", JSON.stringify(productDetail));

    const formDataObj: any = {};
    formData.forEach((value, key) => {
      if (key === "productDetail") {
        formDataObj[key] = JSON.parse(value as string);
      } else {
        formDataObj[key] = value;
      }
    });

    try {
      const resp = await customerOrderService.CustomerInsertOrder(formData);
      return {
        success: true,
        orderId: orderId,
        response: resp,
      };
    } catch (error) {
      return {
        success: false,
        orderId: orderId,
        error: error,
      };
    }
  };

  return { insertOrder, orderID };
};
