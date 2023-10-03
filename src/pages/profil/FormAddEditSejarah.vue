<script setup>
import { useSejarahStore } from "../../store/sejarah-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import LoadingComponent from "../../components/LoadingComponent.vue";

const sejarahStore = useSejarahStore();
const snackbar = useSnackbar();
const router = useRouter();
const route = useRoute();

watch(
  () => sejarahStore.errorMessage,
  () => {
    if (sejarahStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: sejarahStore.errorMessage,
      });
    }
  }
);

watch(
  () => sejarahStore.isSuccessSubmit,
  () => {
    if (sejarahStore.isSuccessSubmit) {
      snackbar.add({
        type: "success",
        text: "Sejarah Berhasil Disimpan",
      });
      router.back();
    }
  }
);

const sejarahForm = ref({
  judul: "",
  isi: "",
  fotoUrl: "",
  fotoName: "",
});
const isEdit = computed(() => route.params.id !== null);
const fotoFile = ref(null);

watch(
  () => sejarahStore.singleData,
  () => {
    const data = sejarahStore.singleData;
    sejarahForm.value.judul = data.judul;
    sejarahForm.value.isi = data.isi;
    sejarahForm.value.fotoUrl = data.foto_url;
    sejarahForm.value.fotoName = data.foto_name;
  }
);

function onChangeFoto(e) {
  fotoFile.value = e.target.files[0];
}

function onClickSubmit(e) {
  e.preventDefault();
  if (route.params.id) {
    sejarahStore.updateSejarah(
      route.params.id,
      sejarahForm.value,
      fotoFile.value
    );
  } else {
    sejarahStore.saveSejarah(sejarahForm.value, fotoFile.value);
  }
}

onMounted(() => {
  if (route.params.id) {
    sejarahStore.getSejarahById(route.params.id);
  }
});
</script>
<template>
  <form class="form" @submit.prevent="onClickSubmit">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">
          Silahkan {{ isEdit ? "Perbarui" : "Tambah" }} Sejarah
        </h4>
      </div>
      <div class="card-body position-relative">
        <LoadingComponent v-if="sejarahStore.isLoading" />
        <div class="row">
          <div class="form-group col-md-12">
            <label for="input">Judul</label>
            <input
              type="text"
              id="title"
              class="form-control"
              placeholder="Isi Judul Disini"
              v-model="sejarahForm.judul"
              required
            />
          </div>
          <div class="form-group col-md-12">
            <label>Isi Sejarah Polindra</label>
            <textarea
              class="form-control"
              rows="4"
              placeholder="Isi Sejarah Polindra"
              v-model="sejarahForm.isi"
              required
            ></textarea>
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
                    ? "Temukan Foto dari Komputer Anda"
                    : fotoFile.name
                }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <input type="submit" class="btn btn-primary w-100" value="Kirim" />
      </div>
    </div>
  </form>
</template>
