<script setup>
import { useSambutanStore } from "../../store/sambutan-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, watch, computed } from "vue";
import { ref } from "vue";
import Pagination from "../../components/Pagination.vue";
import { showConfirm } from "../../utils/notif-utils";

const sambutanStore = useSambutanStore();
const snackbar = useSnackbar();

const sambutanData = computed(() => {
  return sambutanStore.sambutanData;
});

let sambutanDetail = ref({});
function setDetail(text) {
  //complete here, ref isnot defined
  sambutanDetail.value = text;
}

const page = computed(() => {
  return sambutanStore.page;
});

const totalPage = computed(() => {
  return sambutanStore.totalPage;
});

onMounted(() => {
  sambutanStore.getList();
});

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
    if (sambutanStore.isSuccessSubmit && sambutanStore.submitMessage) {
      snackbar.add({
        type: "success",
        text: sambutanStore.submitMessage,
      });

      sambutanStore.getList();
    }
  }
);

function onCLickNext() {
  if (sambutanStore.page < sambutanStore.totalPage) {
    sambutanStore.page++;
    sambutanStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      text: "Sudah Mencapai Halaman Maximum",
    });
  }
}

function shortIsiSambutan(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
}

function onClickPrev() {
  if (sambutanStore.page > 0) {
    sambutanStore.page--;
    sambutanStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      message: "Sudah Mencapai Halaman Minimum",
    });
  }
}

function onClickPaginate(number) {
  sambutanStore.page = number;
  sambutanStore.getList();
}

function confirmDelete(e) {
  e.preventDefault();
  showConfirm(
    "Konfirmasi",
    "Hapus Data?",
    "question",
    "Hapus",
    "Batal",
    (isConfirm) => {
      if (isConfirm) {
        sambutanStore.deleteSambutan(e.target.id);
      }
    }
  );
}
</script>
<template>
  <section class="content">
    <div class="div container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div v-if="sambutanData.length == 0" class="card-tools">
                <router-link to="/tambah-sambutan" class="btn btn-primary">
                  <i class="fas fa-plus mr-1"></i> Tambah Sambutan
                </router-link>
              </div>
            </div>
            <div class="card-body table-responsive p-0">
              <table class="table text-nowrap">
                <thead>
                  <tr>
                    <th>Periode Ketua Senat</th>
                    <th>Isi</th>
                    <th>Foto</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-if="sambutanData.length == 0"
                    class="text-center border"
                  >
                    <td colspan="3">Data Sambutan Kosong</td>
                  </tr>
                  <tr v-for="(sambutan, i) in sambutanData" :key="i">
                    <td>
                      {{ sambutan.judul }}
                    </td>
                    <td>{{ shortIsiSambutan(sambutan.isi, 50) }}</td>
                    <td>
                      <img
                        :src="sambutan.foto_url"
                        alt="image"
                        style="max-width: 100px; max-height: auto"
                      />
                    </td>
                    <td class="text-center">
                      <a href="#" @click.prevent="confirmDelete">
                        <i :id="sambutan.id" class="fas fa-trash"></i>
                      </a>
                      <router-link
                        :to="{
                          name: 'EditSambutan',
                          params: { id: sambutan.id },
                        }"
                      >
                        <i class="fas fa-pen ml-3"></i>
                      </router-link>
                      <a
                        data-toggle="modal"
                        data-target="#modalDetail"
                        @click="setDetail(sambutan.isi)"
                      >
                        <i class="fas fa-eye ml-3"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination
              :page="page"
              :total-page="totalPage"
              @click-prev="onClickPrev"
              @click-next="onCLickNext"
              @click-paginate="onClickPaginate"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <div
    class="modal fade bd-example-modal-lg"
    id="modalDetail"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLongTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            Detail sambutan
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">{{ sambutanDetail }}</div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
