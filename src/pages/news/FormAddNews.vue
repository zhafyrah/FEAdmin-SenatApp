<script setup>
import { useBeritaStore } from "../../store/berita-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, ref, watch, computed } from "vue";
import Datepicker from "vue3-datepicker";
import { useRouter, useRoute } from "vue-router";
import LoadingComponent from "../../components/LoadingComponent.vue";

const beritaStore = useBeritaStore();
const snackbar = useSnackbar();
const router = useRouter();
const route = useRoute();
const isEdit = computed(() => route.params.id !== null);
onMounted(() => {
  if (route.params.id) {
    beritaStore.getBeritaById(route.params.id);
    beritaForm.value = beritaStore.beritaSingleData;
  } else {
    beritaStore.clearForm();
  }
});

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

watch(
  () => beritaStore.singleData,
  () => {
    const data = beritaStore.singleData;
    beritaForm.judul = data.judul;
    beritaForm.tanggal_unggah = new Date(data.tanggal_unggah);
    beritaForm.isi = data.isi;
    fotoUrl.value = data.foto_url;
    fotoName.value = data.foto_name;
  }
);

watch(
  () => beritaStore.isSuccessSubmit,
  () => {
    if (beritaStore.isSuccessSubmit) {
      snackbar.add({
        type: "success",
        text: "Berita Berhasil Disimpan",
      });
      router.back();
    }
  }
);

const beritaForm = ref({
  judul: "",
  tanggal_unggah: new Date(),
  isi: "",
});

const fotoFile = ref(null);
const fotoUrl = ref("");
const fotoName = ref("");
const fotoId = ref("");

function onChangeFoto(e) {
  fotoFile.value = e.target.files[0];
}

function onSubmit(e) {
  e.preventDefault();
  if (route.params.id) {
    beritaStore.updateBerita(
      route.params.id,
      beritaStore.beritaSingleData,
      fotoFile.value
    );
  } else {
    beritaStore.saveBerita(beritaStore.beritaSingleData, fotoFile.value);
  }
}
</script>
<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center">
        <h4 class="card-title">
          Silahkan {{ isEdit ? "Perbarui" : "Tambah" }} Berita
        </h4>
      </div>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="card-body position-relative">
        <LoadingComponent v-if="beritaStore.isLoading" />
        <div class="form-group">
          <label for="inputNews">Judul Berita</label>
          <input
            v-model="beritaStore.beritaSingleData.judul"
            type="text"
            class="form-control"
            id="news"
            placeholder="Judul Berita"
            required
          />
        </div>
        <div class="form-group">
          <label>Tanggal Unggah</label>
          <input
            class="form-control"
            type="date"
            v-model="beritaStore.beritaSingleData.tanggal_unggah"
          />
        </div>
        <div v-if="fotoUrl == ''" class="form-group">
          <label for="inputContent">Isi Berita</label>
          <textarea
            v-model="beritaStore.beritaSingleData.isi"
            class="form-control"
            rows="3"
            placeholder="Isi berita"
            required
          ></textarea>
          <div
            v-if="beritaStore.beritaSingleData.foto_name === ''"
            class="form-group"
          >
            <label for="inputPhoto">Foto</label>
            <div class="input-group">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  accept="image/*"
                  @change="onChangeFoto"
                  required
                />
                <label class="custom-file-label" for="inputPhoto">
                  {{
                    fotoFile == null
                      ? "Pilih foto dari perangkat"
                      : fotoFile.name
                  }}
                </label>
              </div>
            </div>
          </div>
          <div v-else class="row text-center">
            <div class="col-md-12 mt-4">
              <img
                :src="beritaStore.beritaSingleData.foto_path"
                :alt="beritaStore.beritaSingleData.foto_name"
                width="150"
                height="150"
              />
            </div>
            <div class="col-md-12">
              <label>{{ beritaStore.beritaSingleData.foto_name }} </label>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-primary">Unggah</button>
      </div>
    </form>
  </div>
</template>
