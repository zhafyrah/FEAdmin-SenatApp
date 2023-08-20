<script setup>
import { useSambutanStore } from "../../store/sambutan-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const sambutanStore = useSambutanStore();
const snackbar = useSnackbar();
const router = useRouter();
const route = useRoute();

const sambutanForm = ref({
  namaKetuaSenat: "",
  judul: "",
  isi: "",
  fotoUrl: "",
  fotoName: "",
});

const fotoFile = ref(null);
const isEdit = computed(() => route.params.id !== null);

watch(
  () => sambutanStore.errorMessage,
  () => {
    if (sambutanStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: sambutanStore.errorMessage,
      });
    }
  }
);

watch(
  () => sambutanStore.isSuccessSubmit,
  () => {
    if (sambutanStore.isSuccessSubmit) {
      snackbar.add({
        type: "success",
        text: "Sambutan Berhasil Disimpan",
      });

      router.back();
    }
  }
);

watch(
  () => sambutanStore.singleData,
  () => {
    const data = sambutanStore.singleData;
    sambutanForm.value.judul = data.judul;
    sambutanForm.value.isi = data.isi;
    sambutanForm.value.namaKetuaSenat = data.nama_ketua_senat;
    sambutanForm.value.fotoUrl = data.foto_url;
    sambutanForm.value.fotoName = data.foto_name;
  }
);

function onChangeFoto(e) {
  fotoFile.value = e.target.files[0];
}

function onClickSubmit(e) {
  e.preventDefault();
  if (route.params.id) {
    sambutanStore.updateSambutan(route.params.id, sambutanForm.value, null);
  } else {
    sambutanStore.saveSambutan(sambutanForm.value, fotoFile.value);
  }
}

onMounted(() => {
  if (route.params.id) {
    sambutanStore.getSambutanById(route.params.id);
  }
});
</script>
<template>
  <form class="form" @submit.prevent="onClickSubmit">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">
          Silahkan {{ isEdit ? "Perbarui" : "Tambah" }} Sambutan
        </h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="inputName">Nama Ketua Senat</label>
              <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Isi Nama Ketua Senat"
                v-model="sambutanForm.namaKetuaSenat"
                required
              />
            </div>
            <div class="form-group">
              <label for="input">Periode Ketua Senat</label>
              <input
                type="text"
                id="title"
                class="form-control"
                placeholder="Isi Judul Disini"
                v-model="sambutanForm.judul"
                required
              />
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>Sambutan Ketua Senat</label>
            <textarea
              class="form-control"
              rows="4"
              placeholder="Isi Sambutan Ketua Senat"
              v-model="sambutanForm.isi"
            >
            </textarea>
          </div>
        </div>
        <div v-if="sambutanForm.fotoUrl == ''" class="form-group">
          <label for="exampleInputFile">Foto</label>
          <div class="input-group">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="exampleInputFile"
                @change="onChangeFoto"
              />
              <label class="custom-file-label" for="exampleInputFile">
                {{
                  fotoFile == null
                    ? "Temukan Foto dari Komputer Anda"
                    : fotoFile.name
                }}
              </label>
            </div>
          </div>
        </div>
        <div v-else class="row text-center">
          <div class="col-md-12">
            <img :src="sambutanForm.fotoUrl" width="150" height="150" />
          </div>
          <div class="col-md-12">
            <label>{{ sambutanForm.fotoName }}</label>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <input type="submit" class="btn btn-primary w-100" value="Kirim" />
      </div>
    </div>
  </form>
</template>
