<script setup>
import { useGalleryStore } from "../../store/gallery-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import LoadingComponent from "../../components/LoadingComponent.vue";

const galleryStore = useGalleryStore();
const snackbar = useSnackbar();
const router = useRouter();
const route = useRoute();
const isEdit = computed(() => route.params.id !== null);

const fotoFile = ref(null);
const fotoId = ref(0);
const galleryForm = ref({
  keterangan: "",
});

watch(
  () => galleryStore.errorMessage,
  () => {
    if (galleryStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: galleryStore.errorMessage,
      });
    }
  }
);

watch(
  () => galleryStore.isSuccessSubmit,
  () => {
    if (galleryStore.isSuccessSubmit) {
      snackbar.add({
        type: "success",
        text: "Foto berhasil disimpan",
      });
      router.back();
    }
  }
);

function onChangeFoto(e) {
  fotoFile.value = e.target.files[0];
}

function onClickSubmit(e) {
  e.preventDefault();
  galleryStore.saveGallery(galleryForm.value, fotoFile.value);
}

onMounted(() => {
  if (route.params.id) {
    galleryStore.getGalleryById(route.params.id);
  }
});
</script>
<template>
  <div class="card">
    <div class="card-header">
      Silahkan {{ isEdit ? "Perbarui" : "Tambah" }} Foto
    </div>
    <form @submit.prevent="onClickSubmit">
      <div class="card-body position-relative">
        <LoadingComponent v-if="galleryStore.isLoading" />
        <div class="form-group">
          <label for="input">Keterangan</label>
          <input
            type="text"
            class="form-control"
            id="photo"
            placeholder="Isi Keterangan Foto"
            v-model="galleryForm.keterangan"
            required
          />
        </div>
        <div class="form-group">
          <label for="inputPhoto">Foto</label>
          <div class="input-group">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="exampleInputFile"
                accept=".jpg, .jpeg"
                @change="onChangeFoto"
              />
              <label class="custom-file-label" for="exampleInputFile">{{
                fotoFile == null
                  ? "Temukan Foto dari Komputer Anda"
                  : fotoFile.name
              }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-primary w-100">Unggah</button>
      </div>
    </form>
  </div>
</template>
