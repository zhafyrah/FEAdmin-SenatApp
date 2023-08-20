<script setup>
import { useUserSession, useAuthStore } from "../store/auth-store";
import { useRouter, useRoute, useLink } from "vue-router";
import navItem from "./sidebar/nav-item.vue";
import { computed, onMounted } from "vue";

function handleItemClick() {}

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const session = useUserSession();

const user = session.user;
let access = session.permission;
if (!!access && access.constructor === Array) {
  access = access[0];
}

const fullName = user.nama;

const handleLogout = () => {
  authStore.submitLogout();
  router.push({
    path: "/auth/login",
  });
};

const hasAccess = (name) => {
  if (access.exclude != null && access.exclude.includes(name)) {
    return false;
  }

  return access.permission === "*" || access.permission.includes(name);
};

const isUserAccess = computed(() => hasAccess("user"));

// * dokumen
const isDokumenKomisi = computed(() => hasAccess("dokumen komisi"));
const isDokumenPleno = computed(() => hasAccess("dokumen pleno"));
const isDokumenSenat = computed(() => hasAccess("dokumen senat"));

// keanggotaan
const isKeanggotaan = computed(() => hasAccess("keanggotaan"));
const isFungsiKerja = computed(() => hasAccess("fungsi kerja"));

// * profil
const isSambutan = computed(() => hasAccess("sambutan ketua senat"));
const isSejarah = computed(() => hasAccess("sejarah"));

const isBerita = computed(() => hasAccess("berita"));
const isGaleri = computed(() => hasAccess("galeri"));

const isDokumen = computed(
  () => isDokumenKomisi.value || isDokumenPleno.value || isDokumenSenat.value
);
const isOrganisasi = computed(() => isKeanggotaan.value || isFungsiKerja.value);
const isProfile = computed(() => isSambutan.value || isSejarah.value);

const routePath = computed(() => route.path);

onMounted(() => {
  $('[data-widget="treeview"]').Treeview("init");
});
</script>

<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="/" class="brand-link text-center">
      <img
        src="../assets/img/logopolindra.png"
        alt=""
        class="brand-image img-circle elevation-3"
        style="opacity: 1"
      />
      <h4 class="brand-text fw-bold">Senat Polindra</h4>
    </a>
    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="../assets/img/user2-160x160.jpg"
            class="img-circle elevation-2"
            alt="User"
          />
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ fullName }}</a>
        </div>
      </div>

      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <nav-item
            icon-class="fas fa-chart-pie"
            text="Beranda"
            :to="{ path: '/' }"
          >
          </nav-item>

          <nav-item
            v-if="isDokumen"
            icon-class="fas fa-book"
            text="Dokumen"
            to="#"
          >
            <template #dropdown>
              <li v-if="isDokumenPleno" class="nav-item">
                <router-link
                  to="/dokumen-pleno"
                  class="nav-link"
                  :class="{
                    'active router-link-exact-active':
                      routePath.includes('pleno'),
                  }"
                >
                  <i class="nav-icon fas fa-book mr-3"></i>
                  <p>Dokumen Pleno</p>
                </router-link>
              </li>
              <li v-if="isDokumenKomisi" class="nav-item">
                <router-link
                  to="/dokumen-komisi"
                  class="nav-link"
                  :class="{
                    'active router-link-exact-active':
                      routePath.includes('komisi'),
                  }"
                >
                  <i class="nav-icon fas fa-book mr-3"></i>
                  <p>Dokumen Komisi</p>
                </router-link>
              </li>
              <li v-if="isDokumenSenat" class="nav-item">
                <router-link
                  to="/dokumen-senat"
                  class="nav-link"
                  :class="{
                    'active router-link-exact-active':
                      routePath.includes('senat'),
                  }"
                >
                  <i class="nav-icon fas fa-book mr-3"></i>
                  <p>Dokumen Senat</p>
                </router-link>
              </li>
            </template>
          </nav-item>

          <nav-item
            v-if="isOrganisasi"
            icon-class="fas fa-sitemap"
            text="Struktur Organisasi"
            to="#"
          >
            <template #dropdown>
              <li v-if="isKeanggotaan" class="nav-item">
                <router-link to="/anggota" class="nav-link">
                  <i class="nav-icon fas fa-book mr-3"></i>
                  <p>Keanggotaan</p>
                </router-link>
              </li>
              <li v-if="isFungsiKerja" class="nav-item">
                <router-link to="/fungsi-kerja" class="nav-link">
                  <i class="nav-icon fas fa-book mr-3"></i>
                  <p>Fungsi Kerja</p>
                </router-link>
              </li>
            </template>
          </nav-item>

          <nav-item
            v-if="isBerita"
            icon-class="fas fa-newspaper"
            text="Berita"
            :to="{ path: '/berita' }"
            :custom-class="{
              'active router-link-exact-active': routePath.includes('berita'),
            }"
          >
          </nav-item>

          <nav-item
            v-if="isProfile"
            icon-class="fas fa-address-card"
            text="Profil"
            to="#"
          >
            <template #dropdown>
              <li v-if="isSambutan" class="nav-item">
                <router-link to="/sambutan" class="nav-link">
                  <i class="nav-icon fas fa-book mr-3"></i>
                  <p class="">Sambutan Ketua Senat</p>
                </router-link>
              </li>
              <li v-if="isSejarah" class="nav-item">
                <router-link to="/sejarah" class="nav-link">
                  <i class="nav-icon fas fa-book mr-3"></i>
                  <p>Sejarah Polindra</p>
                </router-link>
              </li>
            </template>
          </nav-item>

          <nav-item
            v-if="isGaleri"
            icon-class="fas fa-images"
            text="Galeri"
            :to="{ path: '/galeri' }"
          >
          </nav-item>

          <nav-item
            v-if="isUserAccess"
            icon-class="fas fa-user"
            text="User"
            :to="{ path: '/user' }"
            :custom-class="{
              'active router-link-exact-active': routePath.includes('user'),
            }"
          >
          </nav-item>
        </ul>
      </nav>
      <div class="d-flex align-items-center justify-content-center mt-2">
        <button
          type="button"
          class="btn btn-primary w-100"
          @click="handleLogout"
        >
          Keluar
        </button>
      </div>
    </div>
  </aside>
</template>
<style></style>
