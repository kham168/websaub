<template>
  <v-container>
    <h1 class="mb-6">🛒</h1>

    <!-- Cart Items -->
    <v-row v-if="cartStore.dataCart.length > 0" dense>
      <v-col
        v-for="(item, index) in cartStore.dataCart"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
         <v-card-subtitle>ລະຫັດ: {{ item.id }}</v-card-subtitle>
          <v-card-title>ຊື່:{{ item.name }}</v-card-title>
          <v-card-actions>
            <v-btn color="error" @click="removeFromCart(index)">
              ລົບອອກ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <div v-else class="text-center">
      <v-icon size="64">mdi-cart-off</v-icon>
      <p>Your cart is empty</p>
    </div>

    <!-- ✅ Footer Actions -->
    <v-row v-if="cartStore.dataCart.length > 0" class="mt-6">
      <v-col cols="12" class="d-flex justify-end ga-3">
        <v-btn color="error" variant="tonal" @click="onCancel">
          Cancel
        </v-btn>
        <v-btn color="primary" variant="elevated" @click="openDialog">
          Submit
        </v-btn>
      </v-col>
    </v-row>

    <!-- 📞 Telephone + Comment Input Dialog -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">ຂໍ້ມູນລູກຄ້າ</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="telephone"
            label="ເບີໂທເພື່ອໄດ້ຕິດຕໍ່ກັບ"
            type="tel"
            variant="outlined"
            clearable
          ></v-text-field>

          <v-textarea
            v-model="comment"
            label="ກາລຸນາປ້ອນບ່ອນສົ່ງປາຍທາງໃຫ້ແດ່"
            variant="outlined"
            rows="3"
            auto-grow
            clearable
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="d-flex justify-end ga-2">
          <v-btn variant="tonal" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="confirmSubmit">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useDataCart } from '@/stores'

const cartStore = useDataCart()
const emit = defineEmits(['close'])

const dialog = ref(false)
const telephone = ref("")
const comment = ref("")

// ✅ Load telephone from localStorage or cartStore when mounted
onMounted(() => {
  telephone.value = localStorage.getItem("userTelephone") || cartStore.telephone || ""
})

// ✅ Keep telephone synced
watch(telephone, (newVal) => {
  cartStore.telephone = newVal
  localStorage.setItem("userTelephone", newVal)
})

function removeFromCart(index) {
  cartStore.dataCart.splice(index, 1)
}

function clearCart() {
  cartStore.dataCart.splice(0, cartStore.dataCart.length)
}

function onCancel() {
  clearCart()
  emit('close')
}

function openDialog() {
  dialog.value = true
}

function confirmSubmit() {
  if (!telephone.value) {
    alert("ກາລຸນາປ້ອນເບີຕິດຕໍ່ກັບໃຫ້ແດ່ 📞")
    return
  }

  console.log("Submitting order:", {
    items: cartStore.dataCart,
    telephone: telephone.value,
    comment: comment.value
  })

  alert(`ຕົກລົງສັ່ງຊື້ເນາະ! 📞 ເບີຜູ້ສັ່ງ: ${telephone.value}\n💬 ບ່ອນສົ່ງປາຍທາງ: ${comment.value || "ບໍ່ມີ"}`)

  clearCart()
  comment.value = ""
  dialog.value = false
  emit('close')
}
</script>
