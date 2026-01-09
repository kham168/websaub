<template>
  <v-container fluid class="pa-6">
    <!-- Header Section -->
    <v-card class="mb-6" elevation="0" rounded="lg">
      <v-card-text class="pa-6">
        <div class="d-flex align-center justify-space-between flex-wrap gap-4">
          <div>
            <h1 class="text-h4 mb-2">
              <v-icon color="primary" size="large" class="mr-2"
                >mdi-account-group</v-icon
              >
              ຈັດການຜູ້ໃຊ້
            </h1>
            <p class="text-body-1 text-grey-darken-1">
              ຈັດການຂໍ້ມູນຂອງຜູ້ໃຊ້ທັງໝົດ
            </p>
          </div>
          <v-btn
            color="primary"
            size="large"
            @click="openAddUserDialog"
            prepend-icon="mdi-plus"
            class="text-none"
            elevation="2"
          >
            ເພີ່ມຜູ້ໃຊ້
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card
          class="stat-card"
          color="primary"
          dark
          elevation="4"
          rounded="lg"
        >
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-caption mb-1 opacity-90">ຜູ້ໃຊ້ທັງໝົດ</p>
                <h2 class="text-h4 font-weight-bold">{{ users.length }}</h2>
              </div>
              <v-icon size="48" class="opacity-50">mdi-account-multiple</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card
          class="stat-card"
          color="success"
          dark
          elevation="4"
          rounded="lg"
        >
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-caption mb-1 opacity-90">ຜູ້ໃຊ້ທີ່ຍັງໃຊ້ວຽກ</p>
                <h2 class="text-h4 font-weight-bold">{{ activeUsers }}</h2>
              </div>
              <v-icon size="48" class="opacity-50">mdi-check-circle</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" color="teal" dark elevation="4" rounded="lg">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-caption mb-1 opacity-90">ຜູ້ໃຊ້</p>
                <h2 class="text-h4 font-weight-bold">
                  {{ users.length - adminUsers }}
                </h2>
              </div>
              <v-icon size="48" class="opacity-50">mdi-account</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card
          class="stat-card"
          color="indigo"
          dark
          elevation="4"
          rounded="lg"
        >
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-caption mb-1 opacity-90">ຜູ້ບໍລິຫານ</p>
                <h2 class="text-h4 font-weight-bold">{{ adminUsers }}</h2>
              </div>
              <v-icon size="48" class="opacity-50">mdi-account-cog</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Search and Filter -->
    <v-card class="mb-6" elevation="2" rounded="lg">
      <v-card-text class="pa-4">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search users..."
              variant="outlined"
              density="comfortable"
              clearable
              hide-details
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="filterStatus"
              :items="['All', 'Active', 'Inactive']"
              label="Filter by Status"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-filter"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="filterGender"
              :items="['All', 'Male', 'Female', 'Other']"
              label="Filter by Gender"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-gender-male-female"
              hide-details
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Users Table -->
    <v-card elevation="2" rounded="lg">
      <v-data-table
        :headers="headers"
        :items="filteredUsers"
        :search="search"
        :items-per-page="10"
        class="user-table"
      >
        <template v-slot:header="{ columns }">
          <thead class="custom-header">
            <tr>
              <th v-for="column in columns" :key="column.key">
                {{ column.title }}
              </th>
            </tr>
          </thead>
        </template>
        <template v-slot:item.name="{ item }">
          <div class="d-flex align-center py-2">
            <v-avatar color="primary" class="mr-3">
              <span class="text-h6">{{
                getInitials(item.name, item.surname)
              }}</span>
            </v-avatar>
            <div>
              <div class="font-weight-bold">
                {{ item.name }} {{ item.surname }}
              </div>
            </div>
          </div>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            :color="item.status === 'Active' ? 'success' : 'warning'"
            size="small"
            variant="flat"
          >
            <v-icon start size="small">
              {{
                item.status === "Active"
                  ? "mdi-check-circle"
                  : "mdi-clock-alert"
              }}
            </v-icon>
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.tel="{ item }">
          <span>{{ item.tel }}</span>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex gap-2">
            <v-btn
              icon="mdi-eye"
              size="small"
              variant="tonal"
              color="info"
              @click="viewUser(item)"
            />
            <v-btn
              icon="mdi-pencil"
              size="small"
              variant="tonal"
              color="primary"
              @click="editUser(item)"
            />
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="tonal"
              color="error"
              @click="deleteUser(item)"
            />
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- View User Dialog -->
    <v-dialog v-model="viewDialog" max-width="600">
      <v-card rounded="lg">
        <v-card-title class="bg-info text-white pa-6">
          <v-icon class="mr-2">mdi-account-details</v-icon>
          ຂໍ້ມູນຜູ້ໃຊ້
        </v-card-title>

        <v-card-text class="pa-6">
          <v-list class="transparent">
            <v-list-item class="px-0">
              <template v-slot:prepend>
                <v-avatar color="primary" size="64">
                  <span class="text-h5">{{
                    getInitials(viewedUser.name, viewedUser.surname)
                  }}</span>
                </v-avatar>
              </template>
              <v-list-item-title class="text-h6 mb-1">
                {{ viewedUser.name }} {{ viewedUser.surname }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip
                  :color="
                    viewedUser.status === 'Active' ? 'success' : 'warning'
                  "
                  size="small"
                  class="mt-1"
                >
                  {{ viewedUser.status }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item>

            <v-divider class="my-4"></v-divider>

            <v-list-item class="px-0 mb-3">
              <template v-slot:prepend>
                <v-icon color="primary">mdi-card-account-details</v-icon>
              </template>
              <v-list-item-title class="text-caption text-grey-darken-1"
                >ລະຫັດບັດປະຈໍາຕົວ</v-list-item-title
              >
              <v-list-item-subtitle class="text-body-1 text-black">
                {{ viewedUser.peopleid }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item class="px-0 mb-3">
              <template v-slot:prepend>
                <v-icon color="primary">mdi-phone</v-icon>
              </template>
              <v-list-item-title class="text-caption text-grey-darken-1"
                >ເບີໂທລະສັບ</v-list-item-title
              >
              <v-list-item-subtitle class="text-body-1 text-black">
                {{ viewedUser.tel }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item class="px-0 mb-3">
              <template v-slot:prepend>
                <v-icon color="primary">mdi-shield-account</v-icon>
              </template>
              <v-list-item-title class="text-caption text-grey-darken-1"
                >ສະຖານະ</v-list-item-title
              >
              <v-list-item-subtitle class="text-body-1 text-black">
                {{ viewedUser.type }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item class="px-0 mb-3">
              <template v-slot:prepend>
                <v-icon color="primary">mdi-calendar</v-icon>
              </template>
              <v-list-item-title class="text-caption text-grey-darken-1"
                >ວັນທີເດືອນປີ</v-list-item-title
              >
              <v-list-item-subtitle class="text-body-1 text-black">
                {{ viewedUser.cdate }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn
            variant="text"
            @click="viewDialog = false"
            class="text-none bg-red"
          >
            ປິດ
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            @click="editUserFromView"
            class="text-none"
          >
            ແກ້ໄຂ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add/Edit User Dialog -->
    <v-dialog v-model="userDialog" max-width="800" persistent>
      <v-card rounded="lg">
        <!-- Loading Overlay -->
        <v-overlay
          v-model="loading"
          contained
          class="align-center justify-center"
          persistent
        >
          <v-progress-circular indeterminate size="64" color="primary" />
          <div class="text-h6 mt-4 text-white">ກຳລັງບັນທຶກຂໍ້ມູນ...</div>
        </v-overlay>

        <v-card-title class="bg-primary text-white pa-6">
          <v-icon class="mr-2">{{
            isEditing ? "mdi-pencil" : "mdi-plus"
          }}</v-icon>
          {{ isEditing ? "ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້" : "ເພີ່ມຜູ້ໃຊ້" }}
        </v-card-title>

        <v-card-text class="pa-6">
          <v-form ref="userForm">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedUser.name"
                  label="ຊື່ ແລະ ນາມສະກຸນ *"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  density="comfortable"
                  :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຊື່']"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedUser.idCard"
                  label="ລະຫັດບັດປະຈໍາຕົວ *"
                  prepend-inner-icon="mdi-card-account-details"
                  variant="outlined"
                  density="comfortable"
                  :rules="[(v) => !!v || 'ກະລຸນາປ້ອນລະຫັດບັດ']"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedUser.tel"
                  label="ເບີໂທລະສັບ *"
                  prepend-inner-icon="mdi-phone"
                  variant="outlined"
                  density="comfortable"
                  :rules="[(v) => !!v || 'ກະລຸນາປ້ອນເບີໂທ']"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="editedUser.type"
                  :items="['admin', 'user', 'manager']"
                  label="ປະເພດຜູ້ໃຊ້ *"
                  prepend-inner-icon="mdi-shield-account"
                  variant="outlined"
                  density="comfortable"
                  :rules="[(v) => !!v || 'ກະລຸນາເລືອກປະເພດ']"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="editedUser.password"
                  :label="
                    isEditing
                      ? 'ລະຫັດຜ່ານໃໝ່ (ປ່ອຍວ່າງຖ້າບໍ່ຕ້ອງການປ່ຽນ)'
                      : 'ລະຫັດຜ່ານ *'
                  "
                  prepend-inner-icon="mdi-lock"
                  variant="outlined"
                  density="comfortable"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
                  :rules="
                    isEditing ? [] : [(v) => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານ']
                  "
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn
            variant="text"
            @click="closeDialog"
            class="text-none bg-red"
            :disabled="loading"
          >
            ຍົກເລີກ
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            @click="saveUser"
            class="text-none"
            :disabled="loading"
          >
            <v-icon start>mdi-content-save</v-icon>
            {{ isEditing ? "ບັນທຶກ" : "ເພີ່ມ" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Error Dialog -->
    <v-dialog v-model="errorDialog" max-width="500" persistent>
      <v-card rounded="lg">
        <v-card-title class="bg-error text-white pa-6 d-flex align-center">
          <v-icon class="mr-2" size="large">mdi-alert-circle</v-icon>
          ເກີດຂໍ້ຜິດພາດ
        </v-card-title>

        <v-card-text class="pa-6 text-center">
          <v-icon size="64" color="error" class="mb-4">
            mdi-close-circle-outline
          </v-icon>
          <div class="text-h6 mb-2">{{ errorMessage }}</div>
          <div class="text-body-2 text-grey">
            ກະລຸນາລອງໃໝ່ອີກຄັ້ງ ຫຼື ຕິດຕໍ່ຜູ້ດູແລລະບົບ
          </div>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0 justify-center">
          <v-btn
            color="error"
            variant="flat"
            @click="errorDialog = false"
            class="text-none px-8"
          >
            <v-icon start>mdi-check</v-icon>
            ຕົກລົງ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccessSnackbar" max-width="500" persistent>
      <v-card rounded="lg">
        <v-card-title class="bg-success text-white pa-6 d-flex align-center">
          <v-icon class="mr-2" size="large">mdi-check-circle</v-icon>
          ສຳເລັດ
        </v-card-title>

        <v-card-text class="pa-6 text-center">
          <v-icon size="64" color="success" class="mb-4">
            mdi-check-circle-outline
          </v-icon>
          <div class="text-h6 mb-2">{{ successMessage }}</div>
          <div class="text-body-2 text-grey">
            ດຳເນີນການສຳເລັດແລ້ວ
          </div>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0 justify-center">
          <v-btn
            color="success"
            variant="flat"
            @click="showSuccessSnackbar = false"
            class="text-none px-8"
          >
            <v-icon start>mdi-check</v-icon>
            ຕົກລົງ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAddUser } from "@/composables/useAddUser";
import { useGetAllUser } from "@/composables/useGetAllUser";

const { addUser, loading, success, error } = useAddUser();
const { getAllUser, loadings, errors, fetchAllUser } = useGetAllUser();

// Get channel from cookie at the top level
const channel = useCookie("channel");

const search = ref("");
const filterStatus = ref("All");
const filterGender = ref("All");
const userDialog = ref(false);
const viewDialog = ref(false);
const errorDialog = ref(false);
const isEditing = ref(false);
const showPassword = ref(false);
const showSuccessSnackbar = ref(false);
const showErrorSnackbar = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const userForm = ref(null);

const editedUser = ref({
  name: "",
  idCard: "",
  tel: "",
  type: "admin",
  password: "",
});

const viewedUser = ref({
  name: "",
  surname: "",
  peopleid: "",
  tel: "",
  type: "",
  channel: "",
  cdate: "",
  status: "",
});

// Table headers
const headers = [
  { title: "ຊື່ຜູ້ໃຊ້", key: "name" },
  { title: "ເບີໂທລະສັບ", key: "tel" },
  { title: "ລະຫັດບັດປະຈໍາຕົວ", key: "peopleid" },
  { title: "ສະຖານະ", key: "type" },
  { title: "ວັນທີເດືອນປີ", key: "cdate" },
  { title: "Actions", key: "actions", sortable: false },
];

// Map API data to component format
const users = computed(() => {
  return getAllUser.value.map((user) => ({
    id: user.id,
    name: user.name,
    surname: "",
    idCard: user.peopleid,
    peopleid: user.peopleid,
    gender: "Male",
    tel: user.tel,
    password: "****",
    status: "Active",
    role: user.type,
    type: user.type,
    channel: user.channel || "",
    cdate: new Date(user.cdate).toLocaleDateString(),
  }));
});

// Filters
const filteredUsers = computed(() =>
  users.value.filter((user) => {
    const matchesStatus =
      filterStatus.value === "All" || user.status === filterStatus.value;
    const matchesGender =
      filterGender.value === "All" || user.gender === filterGender.value;
    return matchesStatus && matchesGender;
  })
);

const activeUsers = computed(
  () => users.value.filter((u) => u.status === "Active").length
);

const adminUsers = computed(
  () => users.value.filter((u) => u.type === "admin").length
);

const getInitials = (name, surname) => {
  if (!name) return "?";
  const firstInitial = name.charAt(0).toUpperCase();
  const lastInitial = surname ? surname.charAt(0).toUpperCase() : "";
  return firstInitial + lastInitial;
};

const getGenderColor = (gender) =>
  ({ Male: "blue", Female: "pink", Other: "purple" }[gender] || "grey");

const getGenderIcon = (gender) =>
  ({
    Male: "mdi-gender-male",
    Female: "mdi-gender-female",
    Other: "mdi-gender-male-female",
  }[gender] || "mdi-account");

const openAddUserDialog = () => {
  isEditing.value = false;
  editedUser.value = {
    name: "",
    idCard: "",
    tel: "",
    type: "admin",
    password: "",
  };
  userDialog.value = true;
};

// Load users on component mount
onMounted(async () => {
  await fetchAllUser();
});

const viewUser = (user) => {
  viewedUser.value = {
    name: user.name,
    surname: user.surname,
    peopleid: user.peopleid,
    tel: user.tel,
    type: user.type,
    channel: user.channel,
    cdate: user.cdate,
    status: user.status,
  };
  viewDialog.value = true;
};

const editUserFromView = () => {
  viewDialog.value = false;
  const user = users.value.find(
    (u) => u.peopleid === viewedUser.value.peopleid
  );
  if (user) {
    editUser(user);
  }
};

const editUser = (user) => {
  isEditing.value = true;
  editedUser.value = {
    id: user.id,
    name: user.name,
    idCard: user.idCard,
    tel: user.tel,
    type: user.type,
    password: "",
  };
  userDialog.value = true;
};

const deleteUser = async (user) => {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    console.log("Delete user:", user.id);
    errorMessage.value = "Delete functionality not implemented yet";
    errorDialog.value = true;
  }
};

const closeDialog = () => {
  userDialog.value = false;
  userForm.value?.reset();
  editedUser.value = {
    name: "",
    idCard: "",
    tel: "",
    type: "admin",
    password: "",
  };
};

const saveUser = async () => {
  // Validate form first
  if (userForm.value) {
    const { valid } = await userForm.value.validate();
    if (!valid) {
      errorMessage.value = "ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ";
      errorDialog.value = true;
      return;
    }
  }

  const channelValue = channel.value;

  // Additional validation
  if (!channelValue) {
    errorMessage.value = "ບໍ່ພົບຂໍ້ມູນ Channel, ກະລຸນາເຂົ້າສູ່ລະບົບໃໝ່";
    errorDialog.value = true;
    return;
  }

  const payload = {
    tel: editedUser.value.tel,
    name: editedUser.value.name,
    peopleId: editedUser.value.idCard,
    type: editedUser.value.type,
    password: editedUser.value.password,
    channel: String(channelValue),
  };

  try {
    await addUser(payload);

    if (success.value) {
      successMessage.value = isEditing.value
        ? "ແກ້ໄຂຂໍ້ມູນສຳເລັດ!"
        : "ເພີ່ມຜູ້ໃຊ້ສຳເລັດ!";
      showSuccessSnackbar.value = true;
      await fetchAllUser();
      closeDialog();
    } else if (error.value) {
      errorMessage.value = error.value;
      errorDialog.value = true;
    }
  } catch (err) {
    console.error("❌ Error saving user:", err);
    errorMessage.value = err.message || "ເກີດຂໍ້ຜິດພາດທີ່ບໍ່ຄາດຄິດ";
    errorDialog.value = true;
  }
};
</script>

<style scoped>
.user-table {
  --v-table-header-height: 56px;
}

.user-table :deep(thead) {
  background-color: #2196f3;
}

.user-table :deep(thead th) {
  color: white !important;
  font-size: 18px !important;
}
</style>