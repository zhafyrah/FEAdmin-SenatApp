<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../../store/auth-store";
import { useSnackbar } from "vue3-snackbar";

const authStore = useAuthStore();
const snackbar = useSnackbar();
const router = useRouter();

const formContainer = ref(null);
const loginForm = ref({
  email: "",
  password: "",
  remember: false,
});

function handleLogin() {
  if (loginForm.value.email && loginForm.value.password) {
    authStore.submitLogin(loginForm.value.email, loginForm.value.password);
  } else {
    snackbar.add({
      type: "error",
      text: "Email dan Password harus di isi",
    });
  }
}

authStore.$subscribe((mutatuin, state) => {
  //   console.log("subscribe", state.isSuccess); // status
});

watch(
  () => authStore.isError,
  () => {
    if (authStore.isError) {
      snackbar.add({
        type: "error",
        text: authStore.responseMessage,
      });
    }
  }
);

watch(
  () => authStore.isSuccess,
  () => {
    if (authStore.isSuccess) {
      authStore.$reset();
      snackbar.add({
        type: "success",
        text: "Login Berhasil",
      });

      router.push({
        path: "/",
        replace: true,
      });
    }
  }
);

onMounted(() => {
  const isRemember = localStorage.getItem("remember");
  if (isRemember) {
    loginForm.value.email = isRemember.email;
    loginForm.value.password = isRemember.password;
  }
});
</script>

<template>
  <body class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="#">Senat Polindra</a>
      </div>
      <div class="card">
        <div class="card-body login-card-body">
          <center>
            <!-- <img src="../assets/img/logopolindra.png" width="30" height="30" /> -->
          </center>
          <center>
            <p style="font-size: 30px"><b>Masuk</b></p>
          </center>
          <p class="login-box-msg">Silahkan Masuk Untuk Memulai Sesi</p>
          <form @submit.prevent="handleLogin" :ref="formContainer">
            <div class="input-group mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                v-model="loginForm.email"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Kata Sandi"
                v-model="loginForm.password"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input
                    type="checkbox"
                    id="remember"
                    v-model="loginForm.remember"
                  />
                  <label for="remember"> Ingat Saya </label>
                </div>
              </div>
              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block">
                  Masuk
                </button>
              </div>
            </div>
          </form>
          <p class="mb-1">
            <!-- <a href="forgot-password.html">Lupa Kata Sandi</a> -->
          </p>
        </div>
      </div>
    </div>
  </body>
</template>
