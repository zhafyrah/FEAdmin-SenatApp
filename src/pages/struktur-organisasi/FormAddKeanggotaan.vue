<script setup>
import { useKeanggotaanStore } from "../../store/keanggotaan-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import LoadingComponent from "../../components/LoadingComponent.vue";

const keanggotaanStore = useKeanggotaanStore();
const snackbar = useSnackbar();
const router = useRouter();

onMounted(() => {});

watch(
  () => keanggotaanStore.errorMessage,
  () => {
    if (keanggotaanStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: keanggotaanStore.errorMessage,
      });
    }
  }
);

watch(
  () => keanggotaanStore.isSuccessSubmit,
  () => {
    if (keanggotaanStore.isSuccessSubmit) {
      snackbar.add({
        type: "success",
        text: "Keanggotaan Berhasil Disimpan",
      });
      router.back();
    }
  }
);

const keanggotaanForm = ref({
  nama: "",
  jabatan: "",
  pendidikan: "",
  periode: "",
});

const fotoFile = ref(null);

function onChangeFoto(e) {
  fotoFile.value = e.target.files[0];
}

function onClickSubmit(e) {
  e.preventDefault();
  keanggotaanStore.saveKeanggotaan(keanggotaanForm.value, fotoFile.value);
}
</script>
<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Silahkan Tambahkan Keanggotaan</h5>
    </div>
    <form class="form-user" @submit.prevet="onClickSubmit">
      <div class="card-body position-relative">
        <LoadingComponent v-if="keanggotaanStore.isLoading" />
        <div class="form-group">
          <label for="inputEmail">Nama</label>
          <div class="form">
            <input
              type="text"
              class="form-control"
              placeholder="Silahkan Isi Nama"
              v-model="keanggotaanForm.nama"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label>Jabatan</label>
          <div class="form">
            <input
              type="text"
              class="form-control"
              placeholder="Silahkan Isi Jabatan"
              v-model="keanggotaanForm.jabatan"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputEmail">Pendidikan Terakhir</label>
          <div class="form">
            <input
              type="text"
              class="form-control"
              placeholder="Silahkan Isi Pendidikan"
              v-model="keanggotaanForm.pendidikan"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputEmail">Periode</label>
          <div class="form">
            <input
              type="text"
              class="form-control"
              placeholder="Silahkan Isi Periode"
              v-model="keanggotaanForm.periode"
              required
            />
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
                @change="onChangeFoto"
              />
              <label class="custom-file-label" for="exampleInputFile">
                {{
                  fotoFile == null
                    ? "Temukan Dokumen dari Komputer Anda"
                    : fotoFile.name
                }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-primary w-100">Kirim</button>
      </div>
    </form>
  </div>
</template>
