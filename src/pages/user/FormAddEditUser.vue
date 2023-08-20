<script setup>
import { useUserStore } from "../../store/user-store";
import { useMstStore } from "../../store/mst-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ucwords } from "../../utils/formating-utils";

const userStore = useUserStore();
const mstStore = useMstStore();
const snackbar = useSnackbar();
const router = useRouter();
const route = useRoute();
const isEdit = computed(() => route.params.id !== null);
const roleData = computed(() => mstStore.roleData);
const userForm = ref({
  nama: "",
  nip: "",
  role: 0,
  status: 0,
  email: "",
  password: "",
});

onMounted(() => {
  mstStore.getRoles();
});

watch(
  () => userStore.errorMessage,
  () => {
    if (userStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: userStore.errorMessage,
      });
    }
  }
);

watch(
  () => userStore.isSuccessSubmit,
  () => {
    if (userStore.isSuccessSubmit) {
      userStore.$reset();

      snackbar.add({
        type: "success",
        text: "User Berhasil Disimpan",
      });

      router.back();
    }
  }
);

watch(
  () => userStore.singleData,
  () => {
    const data = userStore.singleData;
    userForm.value.nama = data.nama;
    userForm.value.nip = data.nip;
    userForm.value.email = data.email;
    userForm.value.status = data.status;
    userForm.value.role = data.role_id;
    userForm.value.password = data.password;
  }
);

function onChangeStatus(e) {
  userForm.value.status = e.target.checked;
}

function onClickSubmit(e) {
  e.preventDefault();
  if (route.params.id) {
    userStore.updateUser(route.params.id, userForm.value);
  } else {
    userStore.saveUser(userForm.value);
  }
}

onMounted(() => {
  if (route.params.id) {
    userStore.getUserById(route.params.id);
  }
});
</script>
<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">
        Silahkan {{ isEdit ? "Perbarui" : "Tambah" }} User
      </h4>
    </div>
    <form class="form-user" @submit.prevet="onClickSubmit">
      <div class="card-body">
        <div class="form-group">
          <label for="inputName">Nama</label>
          <div class="form">
            <input
              type="text"
              class="form-control"
              placeholder="Silahkan Isi Nama"
              v-model="userForm.nama"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputName">NIP</label>
          <div class="form">
            <input
              type="text"
              class="form-control"
              placeholder="Silahkan Isi NIP"
              v-model="userForm.nip"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label>Role</label>
          <select class="form-control" v-model="userForm.role" required>
            <option selected disabled value="0">Silahkan Pilih Role</option>
            <option v-for="item in roleData" :value="item.id">
              {{ ucwords(item.role) }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <div class="form">
            <input
              type="email"
              class="form-control"
              placeholder="Silahkan Isi Email"
              v-model="userForm.email"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3">Kata Sandi</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword3"
            placeholder="Kata Sandi"
            v-model="userForm.password"
            required
          />
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-primary w-100">Kirim</button>
      </div>
    </form>
  </div>
</template>
