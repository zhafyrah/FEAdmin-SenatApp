<script setup>
import { useBeritaStore } from "../../store/berita-store";
import { onMounted, watch, computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const beritaStore = useBeritaStore();
const router = useRouter();
const route = useRoute();

const beritaData = computed(() => beritaStore.beritaSingleData);
let fotoUrl = ref();

watch(
  () => beritaStore.beritaSingleData,
  () => {
    if (beritaStore.beritaSingleData) {
      fotoUrl.value =
        import.meta.env.VITE_BASE_URL + beritaStore.beritaSingleData.foto_path;
    }
  }
);

watch(
  () => beritaStore.errorMessage,
  () => {
    if (beritaStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: beritaStore.errorMessage,
      });
    }
  }
);

onMounted(() => {
  //beritaStore.$reset()
  beritaStore.getBeritaById(route.params.id);
});
</script>
<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-12 col-md-12 col-lg-8 order-2 order-md-1">
          <div class="row">
            <div class="col-12">
              <span class="parent">
                <h4>{{ beritaData.judul }}</h4>
              </span>
              <span class="description"
                >Diunggah - {{ beritaData.created_at }}</span
              >
            </div>
          </div>
          <div class="row">
            <div class="col-6 mt-4">
              <img class="img-fluid" :src="fotoUrl" alt="berita" />
            </div>
            <div class="col-12 mt-4">
              <p class="text-muted">
                {{ beritaData.isi }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="col-12 col-md-12 col-lg-4 order-1 order-md-2 d-flex justify-content-end"
        >
          <div class="text-muted">
            <p class="text-sm">
              Pembuat Berita
              <b class="d-block"> {{ beritaData.nama_user }} </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
