<script setup>
import { useDokKomisiStore } from "../../store/dokumen-komisi-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, ref, watch, computed } from "vue";
import Datepicker from "vue3-datepicker";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { urlToFile } from "../../utils/form-utils";
import request from "../../api/request";

const dokStore = useDokKomisiStore();
const snackbar = useSnackbar();
const router = useRouter();
const route = useRoute();
const isEdit = computed(() => route.params.id !== null);
const dokUrl = ref("");
const dokName = ref("");
const dokId = ref(0);

const dokForm = ref({
  noSurat: "",
  tanggal_unggah: new Date(),
  keterangan: "",
});

const dokFile = ref(null);

watch(
  () => dokStore.errorMessage,
  () => {
    if (dokStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: dokStore.errorMessage,
      });
    }
  }
);

watch(
  () => dokStore.isSuccessSubmit,
  () => {
    if (dokStore.isSuccessSubmit) {
      dokStore.$reset();

      snackbar.add({
        type: "success",
        text: "Dokumen Komisi Berhasil Disimpan",
      });

      router.back();
    }
  }
);

watch(
  () => dokStore.singleData,
  () => {
    dokId.value = dokStore.singleData.id;
    dokForm.value.noSurat = dokStore.singleData.no_surat;
    dokForm.value.tanggal_unggah = dokStore.singleData.tanggal_unggah;
    dokForm.value.keterangan = dokStore.singleData.keterangan;
    dokUrl.value = dokStore.singleData.dokumen_url;
    dokName.value = dokStore.singleData.dokumen_name;
  }
);

function onChangeDok(e) {
  dokFile.value = e.target.files[0];
}

function onSubmit(e) {
  e.preventDefault();
  if (dokId.value == 0) {
    dokStore.saveDokKomisi(dokForm.value, dokFile.value);
  } else {
    dokStore.updateDokKomisi(dokId.value, dokForm.value, null);
  }
}

onMounted(() => {
  if (route.params.id) {
    dokStore.getDokKomisiById(route.params.id);
  }
});
</script>
<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center">
        <h5 class="card-title">
          Silahkan {{ isEdit ? "Perbarui" : "Tambah" }} Dokumen Komisi
        </h5>
      </div>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="inputName">No Dokumen</label>
              <input
                type="text"
                id="nosurat"
                class="form-control"
                v-model="dokForm.noSurat"
                required
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label for="inputEmail">Keterangan</label>
              <input
                type="text"
                id="keterangan"
                class="form-control"
                v-model="dokForm.keterangan"
                required
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label>Tanggal Unggah</label>
              <input
                class="form-control"
                type="date"
                v-model="dokForm.tanggal_unggah"
              />
            </div>
          </div>
        </div>
        <div v-if="dokUrl == ''" class="form-group">
          <label for="exampleInputFile">Unggah Dokumen</label>
          <div class="input-group">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="exampleInputFile"
                @change="onChangeDok"
              />
              <label class="custom-file-label" for="exampleInputFile">
                {{
                  dokFile == null
                    ? "Temukan Dokumen dari Komputer Anda"
                    : dokFile.name
                }}
              </label>
            </div>
          </div>
        </div>
        <div v-else class="row text-left">
          <!-- <div class="col-md-12">
            <img :src="dokUrl" width="150" height="150" />
          </div> -->
          <div class="col-md-12">
            <h5>Dokumen yang diunggah: {{ dokName }}</h5>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-center">
        <button type="submit" class="btn btn-primary w-100">Unggah</button>
      </div>
    </form>
  </div>
</template>
