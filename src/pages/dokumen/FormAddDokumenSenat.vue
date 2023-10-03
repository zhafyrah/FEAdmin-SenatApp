<script setup>
import { useDokSenatStore } from "../../store/dokumen-senat-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, ref, watch, computed } from "vue";
import Datepicker from "vue3-datepicker";
import { useRouter, useRoute } from "vue-router";
import LoadingComponent from "../../components/LoadingComponent.vue";

const dokStore = useDokSenatStore();
const snackbar = useSnackbar();
const router = useRouter();
const route = useRoute();
const isEdit = computed(() => route.params.id !== null);
const dokForm = ref({
  judulDok: "",
  tanggal_unggah: new Date(),
  keterangan: "",
  link_url: "",
});

const dokUrl = ref("");
const dokName = ref("");
const dokId = ref(0);
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
        text: "Dokumen Pleno Berhasil di Simpan",
      });
      router.back();
    }
  }
);

watch(
  () => dokStore.singleData,
  () => {
    dokId.value = dokStore.singleData.id;
    dokForm.value.noSurat = dokStore.singleData.judul_dokumen;
    dokForm.value.tanggal_unggah = dokStore.singleData.tanggal_unggah;
    dokForm.value.keterangan = dokStore.singleData.keterangan;
    dokForm.value.link_url = dokStore.singleData.link_url;
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
    dokStore.saveDokSenat(dokForm.value, dokFile.value);
  } else {
    dokStore.updateDokSenat(dokId.value, dokForm.value, dokFile.value);
  }
}

onMounted(() => {
  if (route.params.id) {
    dokStore.getDokSenatById(route.params.id);
  }
});
</script>
<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center">
        <h5>Silahkan {{ isEdit ? "Perbarui" : "Tambahkan" }} Dokumen Senat</h5>
      </div>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="card-body position-relative">
        <LoadingComponent v-if="dokStore.isLoading" />
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="inputName">Nama Dokumen</label>
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
              <label for="inputName">Link Url</label>
              <input
                type="text"
                id="nosurat"
                class="form-control"
                v-model="dokForm.link_url"
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
        <div class="form-group">
          <label for="exampleInputFile">Foto</label>
          <div class="input-group">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="exampleInputFile"
                accept=".jpg, .jpeg"
                @change="onChangeDok"
              />
              <label class="custom-file-label" for="exampleInputFile">
                {{
                  dokFile == null
                    ? "Temukan Foto dari Komputer Anda"
                    : dokFile.name
                }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-center">
        <button type="submit" class="btn btn-primary w-100">Kirim</button>
      </div>
    </form>
  </div>
</template>
