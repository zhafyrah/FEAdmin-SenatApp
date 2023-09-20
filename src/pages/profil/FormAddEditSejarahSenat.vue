<script setup>
import { useSejarahSenatStore } from "../../store/sejarah-senat-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import LoadingComponent from "../../components/LoadingComponent.vue";

const sejarahSenatStore = useSejarahSenatStore();
const snackbar = useSnackbar();
const router = useRouter();
const route = useRoute();

watch(
  () => sejarahSenatStore.errorMessage,
  () => {
    if (sejarahSenatStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: sejarahSenatStore.errorMessage,
      });
    }
  }
);

watch(
  () => sejarahSenatStore.isSuccessSubmit,
  () => {
    if (sejarahSenatStore.isSuccessSubmit) {
      snackbar.add({
        type: "success",
        text: "Sejarah Senat Berhasil Disimpan",
      });
      router.back();
    }
  }
);

const sejarahSenatForm = ref({
  judul: "",
  isi: "",
  fotoUrl: "",
  fotoName: "",
});
const isEdit = computed(() => route.params.id !== null);
const fotoFile = ref(null);

watch(
  () => sejarahSenatStore.singleData,
  () => {
    const data = sejarahSenatStore.singleData;
    sejarahSenatForm.value.judul = data.judul;
    sejarahSenatForm.value.isi = data.isi;
    sejarahSenatForm.value.fotoUrl = data.foto_url;
    sejarahSenatForm.value.fotoName = data.foto_name;
  }
);

function onChangeFoto(e) {
  fotoFile.value = e.target.files[0];
}

function onClickSubmit(e) {
  e.preventDefault();
  if (route.params.id) {
    sejarahSenatStore.updateSejarahSenat(
      route.params.id,
      sejarahSenatForm.value,
      null
    );
  } else {
    sejarahSenatStore.saveSejarahSenat(sejarahSenatForm.value, fotoFile.value);
  }
}

onMounted(() => {
  if (route.params.id) {
    sejarahSenatStore.getSejarahSenatById(route.params.id);
  }
});
</script>
<template>
  <form class="form" @submit.prevent="onClickSubmit">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">
          Silahkan {{ isEdit ? "Perbarui" : "Tambah" }} Sejarah Senat
        </h4>
      </div>
      <div class="card-body position-relative">
        <LoadingComponent v-if="sejarahSenatStore.isLoading" />
        <div class="row">
          <div class="form-group col-md-12">
            <label for="input">Judul</label>
            <input
              type="text"
              id="title"
              class="form-control"
              placeholder="Isi Judul Disini"
              v-model="sejarahSenatForm.judul"
              required
            />
          </div>
          <div class="form-group col-md-12">
            <label>Isi Sejarah Senat Polindra</label>
            <textarea
              class="form-control"
              rows="4"
              placeholder="Isi Sejarah Senat"
              v-model="sejarahSenatForm.isi"
              required
            ></textarea>
          </div>
        </div>
        <div v-if="sejarahSenatForm.fotoUrl == ''" class="form-group">
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
            <img :src="sejarahSenatForm.fotoUrl" width="150" height="150" />
          </div>
          <div class="col-md-12">
            <label>{{ sejarahSenatForm.fotoName }}</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <input type="submit" class="btn btn-primary w-100" value="Kirim" />
      </div>
    </div>
  </form>
</template>
