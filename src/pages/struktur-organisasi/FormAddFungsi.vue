<script setup>
import { useFungsiKerjaStore } from "../../store/fungsi-kerja-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";

const fungsiKerjaStore = useFungsiKerjaStore();
const snackbar = useSnackbar();
const router = useRouter();

watch(
  () => fungsiKerjaStore.errorMessage,
  () => {
    if (fungsiKerjaStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: fungsiKerjaStore.errorMessage,
      });
    }
  }
);

watch(
  () => fungsiKerjaStore.isSuccessSubmit,
  () => {
    if (fungsiKerjaStore.isSuccessSubmit) {
      snackbar.add({
        type: "success",
        text: "Fungsi Kerja Berhasil Disimpan",
      });

      router.back();
    }
  }
);

const additionalFields = ref([{ value: "" }]);

function addAdditionalField() {
  additionalFields.value.push({ value: "" });
}

function removeAdditionalField(index) {
  additionalFields.value.splice(index, 1);
}

const fungsiKerjaForm = ref({
  komisi: "",
  namaKomisi: "",
  ketuaKomisi: "",
  fungsiKerja: "",
});

function onClickSubmit(e) {
  e.preventDefault();
  fungsiKerjaStore.saveFungsiKerja(
    fungsiKerjaForm.value,
    additionalFields.value
  );
}
</script>
<template>
  <div class="card">
    <form class="form" @submit.prevent="onClickSubmit">
      <div class="card-body">
        <div class="form-group">
          <label for="komisi">Komisi</label>
          <select
            id="komisi"
            class="form-control"
            v-model="fungsiKerjaForm.komisi"
            required
          >
            <option value="" disabled>Select Komisi</option>
            <option value="Komisi A">Komisi A</option>
            <option value="Komisi B">Komisi B</option>
            <option value="Komisi C">Komisi C</option>
            <option value="Komisi D">Komisi D</option>
          </select>
        </div>
        <div class="form-group">
          <label for="namaKomisi">Nama Komisi</label>
          <input
            id="namaKomisi"
            type="text"
            class="form-control"
            placeholder="Nama Komisi"
            v-model="fungsiKerjaForm.namaKomisi"
            required
          />
        </div>
        <div class="form-group">
          <label for="ketuaKomisi">Ketua Komisi</label>
          <input
            id="ketuaKomisi"
            type="text"
            class="form-control"
            placeholder="Ketua Komisi"
            v-model="fungsiKerjaForm.ketuaKomisi"
            required
          />
        </div>
        <div
          class="form-group"
          v-for="(anggota, index) in additionalFields"
          :key="index"
        >
          <label :for="'anggotaField_' + index">Anggota {{ index + 1 }}</label>
          <input
            :id="'anggotaField_' + index"
            type="text"
            class="form-control"
            :placeholder="'Tambah Anggota ' + (index + 1)"
            v-model="anggota.value"
          />
          <div class="text-right mt-2">
            <button
              type="button"
              v-if="additionalFields.length > 1"
              class="btn btn-danger btn-sm"
              @click="removeAdditionalField(index)"
            >
              <i class="fas fa-trash"></i>
            </button>
            <button
              type="button"
              class="btn btn-success btn-sm ml-2"
              @click="addAdditionalField"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="form-group">
          <label for="fungsiKerja">Fungsi Kerja</label>
          <textarea
            id="fungsiKerja"
            class="form-control"
            rows="3"
            placeholder="Fungsi Kerja"
            v-model="fungsiKerjaForm.fungsiKerja"
          ></textarea>
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-primary w-100">Kirim</button>
      </div>
    </form>
  </div>
</template>
