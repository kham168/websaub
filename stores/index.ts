
import { defineStore } from "pinia";
import { ref, computed } from "vue";
// import type { BrandCreamItem } from "~/services/types/brand_cream-type";

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
  Price1?: string;
  Price2?: string;
  Price3?: string;
  tel?: string;
  detail?: string;
  donation?: string;
  image?: string[];
}

// ----------------------------
// Product Sell Store
// ----------------------------
export const useProductSellStore = defineStore("productSell", () => {
  const cartItems = ref<Product[]>([]);

  // ➕ Add product to cart
  const addToCart = (product: Product) => {
    const existing = cartItems.value.find((p) => p.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 0) + 1;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
  };
  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
      const price = Number(
        item.Price3 || item.Price1 || item.Price2 || item.price || 0
      );
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
  };
});
