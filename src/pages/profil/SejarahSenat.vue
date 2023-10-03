<script setup>
import { useSejarahSenatStore } from "../../store/sejarah-senat-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, watch, computed } from "vue";
import { ref } from "vue";
import Pagination from "../../components/Pagination.vue";
import { showConfirm } from "../../utils/notif-utils";
import LoadingComponent from "../../components/LoadingComponent.vue";

const sejarahSenatStore = useSejarahSenatStore();
const snackbar = useSnackbar();

const sejarahSenatData = computed(() => {
  return sejarahSenatStore.sejarahSenatData;
});

let sejarahSenatDetail = ref({});

function setDetail(text) {
  sejarahSenatDetail.value = text;
}

const page = computed(() => {
  return sejarahSenatStore.page;
});

const totalPage = computed(() => {
  return sejarahSenatStore.totalPage;
});

onMounted(() => {
  sejarahSenatStore.getList();
});

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
    if (sejarahSenatStore.isSuccessSubmit && sejarahSenatStore.submitMessage) {
      snackbar.add({
        type: "success",
        text: sejarahSenatStore.submitMessage,
      });
      sejarahSenatStore.getList();
    }
  }
);

function onCLickNext() {
  if (sejarahSenatStore.page < sejarahSenatStore.totalPage) {
    sejarahSenatStore.page++;
    sejarahSenatStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      text: "Sudah Mencapai Halaman Maximum",
    });
  }
}

function onClickPrev() {
  if (sejarahSenatStore.page > 0) {
    sejarahSenatStore.page--;
    sejarahSenatStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      message: "Sudah Mencapai Halaman Minimum",
    });
  }
}

function onClickPaginate(number) {
  sejarahSenatStore.page = number;
  sejarahSenatStore.getList();
}

function shortIsiSejarahSenat(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
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
        sejarahSenatStore.deleteSejarah(e.target.id);
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
              <div class="card-tools">
                <div v-if="sejarahSenatData.length == 0" class="card-tools">
                  <router-link
                    to="/tambah-sejarah-senat"
                    class="btn btn-primary"
                  >
                    <i class="fas fa-plus mr-1"></i> Tambah Sejarah Senat
                  </router-link>
                </div>
              </div>
            </div>
            <div class="card-body table-responsive p-0">
              <table class="table text-nowrap">
                <thead>
                  <tr>
                    <th>Judul</th>
                    <th>Isi</th>
                    <th>Foto</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody class="position-relative">
                  <LoadingComponent v-if="sejarahSenatStore.isLoading" />
                  <tr
                    v-if="sejarahSenatData.length == 0"
                    class="text-center border"
                  >
                    <td colspan="3">Data Sejarah Kosong</td>
                  </tr>
                  <tr v-for="(sejarahSenat, i) in sejarahSenatData" :key="i">
                    <td>
                      {{ sejarahSenat.judul }}
                    </td>
                    <td>{{ shortIsiSejarahSenat(sejarahSenat.isi, 50) }}</td>
                    <td>
                      <img
                        :src="sejarahSenat.foto_url"
                        :alt="sejarahSenat.foto_name"
                        style="max-width: 100px; max-height: auto"
                      />
                    </td>
                    <td class="text-left ml-3">
                      <a href="#" @click.prevent="confirmDelete">
                        <i :id="sejarahSenat.id" class="fas fa-trash"></i>
                      </a>
                      <router-link
                        :to="{
                          name: 'Edit Sejarah Senat Polindra',
                          params: { id: sejarahSenat.id },
                        }"
                      >
                        <i class="fas fa-pen ml-3"></i>
                      </router-link>
                      <a
                        data-toggle="modal"
                        data-target="#modalDetail"
                        @click="setDetail(sejarahSenat.isi)"
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
          <h5 class="modal-title" id="exampleModalLongTitle">Detail Sejarah</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">{{ sejarahSenatDetail }}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
