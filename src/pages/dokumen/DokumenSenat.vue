<script setup>
import { useDokSenatStore } from "../../store/dokumen-senat-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, watch, computed } from "vue";
import Pagination from "../../components/Pagination.vue";
import { showConfirm } from "../../utils/notif-utils";

const dokStore = useDokSenatStore();
const snackbar = useSnackbar();

const data = computed(() => dokStore.dokData);
const page = computed(() => dokStore.page);
const totalPage = computed(() => dokStore.totalPage);

onMounted(() => {
  dokStore.getList();
});

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
      snackbar.add({
        type: "success",
        text: "Data Dokumen Senat Berhasil di Hapus",
      });

      dokStore.getList();
    }
  }
);

function onCLickNext() {
  if (dokStore.page < dokStore.totalPage) {
    dokStore.page++;
    dokStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      text: "Sudah Mencapai Halaman Maximum",
    });
  }
}

function onClickPrev() {
  if (dokStore.page > 0) {
    dokStore.page--;
    dokStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      message: "Sudah Mencapai Halaman Minimum",
    });
  }
}

function onClickPaginate(number) {
  dokStore.page = number;
  dokStore.getList();
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
        dokStore.$reset();
        dokStore.deleteDokSenat(e.target.id);
      }
    }
  );
}
</script>
<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <router-link
          :to="{ name: 'TambahDokumenSenat' }"
          class="btn btn-primary"
        >
          <i class="fas fa-plus mr-1"></i>
          Tambah Dokumen
        </router-link>
        <div class="card-tools mt-2">
          <div class="input-group input-group-sm" style="width: 200px">
            <input
              type="text"
              name="table_search"
              class="form-control float-right"
              placeholder="Search"
            />
            <div class="input-group-append">
              <button type="submit" class="btn btn-default">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body table-responsive p-0">
        <table
          class="table table-bordered table-head-fixed text-nowrap table-hover"
        >
          <thead class="text-center">
            <tr>
              <th>Judul Dokumen</th>
              <th>Link Dokumen</th>
              <th>Foto</th>
              <th>Tanggal Unggah</th>
              <th>Keterangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="data.length == 0" class="text-center border">
              <td colspan="6">Dokumen Senat Kosong</td>
            </tr>
            <tr v-for="(dok, i) in data" :key="i">
              <td>
                {{ dok.judul_dokumen }}
              </td>
              <td>{{ dok.link_url }}</td>
              <td>
                <img
                  :src="dok.dokumen_url"
                  alt="dokumen senat"
                  style="width: 200px"
                />
              </td>
              <td>{{ dok.tanggal_unggah }}</td>
              <td>{{ dok.keterangan }}</td>
              <td class="text-center">
                <a href="#" @click.prevent="confirmDelete">
                  <i :id="dok.id" class="fas fa-trash"></i>
                </a>
                <router-link
                  :to="{ name: 'EditDokumenSenat', params: { id: dok.id } }"
                >
                  <i class="fas fa-pen ml-3"></i>
                </router-link>
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
</template>
