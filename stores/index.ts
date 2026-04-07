
import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { ref, computed } from "vue";

// ----------------------------
// General data store
// ----------------------------
export const useDataStore = defineStore("dataStore", () => {
  const dataTs = ref("test234");
  return { dataTs };
});

// ----------------------------
// Cart data store
// ----------------------------
export const useDataCart = defineStore("dataCart", () => {
  const dataCart = ref<any[]>([]);
  return { dataCart };
});

// ----------------------------
// Product interface
// ----------------------------
export interface Product {
  id: number | string;
  name: string;
  price?: number;
  quantity?: number;
  price1?: string;
  price2?: string;
  price3?: string;
  tel?: string;
  detail?: string;
  donation?: string;
  image?: string[];
  qr?: string;
  channel?: string;
}

// ----------------------------
// Product Sell Store
// ----------------------------
export const useProductSellStore = defineStore("productSell", () => {
  const cartItems = ref<Product[]>([]);

  // ➕ Add product to cart
  const addToCart = (product: Product) => {
    if (cartItems.value.length > 0) {
      const existing = cartItems.value.find((p) => p.id === product.id);
      const duplicateChannel = cartItems.value.find(
        (p) => p.tel === product.tel
      );
      if (existing) {
        existing.quantity = (existing.quantity || 0) + 1;
      } else if (duplicateChannel) {
        cartItems.value.push({ ...product });
      } else {
        Swal.fire({
          icon: "warning",
          title:
            "Cannot add different channels's product together. Please order this product first before adding other channels's products.",
          showConfirmButton: false,
          timer: 5000,
        });
      }
    } else {
      cartItems.value.push({ ...product });
    }
  };

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
      const price = Number(item.price);
      const qty = Number(item.quantity || 0);
      return total + price * qty;
    }, 0);
  });

  // 🔄 Update cart item quantity
  const updateCart = (product: Product) => {
    const existing = cartItems.value.find((p) => p.id === product.id);
    if (existing) existing.quantity = product.quantity;
  };

  // ➖ Remove from cart
  const removeFromCart = (id: number | string) => {
    cartItems.value = cartItems.value.filter((p) => p.id !== id);
  };

  // 🗑️ Clear entire cart
  const clearCart = () => {
    cartItems.value = [];
  };

  // 🔢 Total quantity of items in cart
  const cartCount = computed(() =>
    cartItems.value.reduce((total, item) => total + (item.quantity || 0), 0)
  );

  return {
    cartItems,
    cartCount,
    totalPrice,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart, // ✅ Export clearCart
  };
});