<script setup>
import { useBeritaStore } from "../../store/berita-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, watch, computed } from "vue";
import Pagination from "../../components/Pagination.vue";
import { showConfirm } from "../../utils/notif-utils";

const beritaStore = useBeritaStore();
const snackbar = useSnackbar();

const beritaData = computed(() => beritaStore.beritaData);
const page = computed(() => beritaStore.page);
const totalPage = computed(() => beritaStore.totalPage);
const lastNumberPage = computed(() => beritaStore.lastNoPage);

onMounted(async () => {
  //beritaStore.$reset()
  await beritaStore.getList();
});

watch(
  () => beritaStore.errorMessage,
  () => {
    if (beritaStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: beritaStore.errorMessage,
      });
    }
  }
);

watch(
  () => beritaStore.isSuccessSubmit,
  () => {
    if (beritaStore.isSuccessSubmit) {
      snackbar.add({
        type: "success",
        text: "Data Berita Berhasil di Hapus",
      });

      beritaStore.getList();
    }
  }
);

function onCLickNext() {
  if (beritaStore.page < beritaStore.totalPage) {
    beritaStore.page++;
    beritaStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      text: "Sudah Mencapai Halaman Maximum",
    });
  }
}

function onClickPrev() {
  if (beritaStore.page > 0) {
    beritaStore.page--;
    beritaStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      message: "Sudah Mencapai Halaman Minimum",
    });
  }
}

function onClickPaginate(number) {
  beritaStore.page = number;
  beritaStore.getList();
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
        beritaStore.deleteBerita(e.target.id);
      }
    }
  );
}
</script>
<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <router-link to="/tambah-berita">
          <button class="btn btn-primary">
            <i class="fas fa-plus mr-1"></i>Unggah Berita
          </button>
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

      <div class="card-body table-responsive p-0 mb-5">
        <table class="table table-bordered table-hover">
          <thead class="text-center">
            <tr>
              <th>No</th>
              <th>Judul Berita</th>
              <th>Isi Berita</th>
              <th>Foto</th>
              <th>Pembuat</th>
              <th>Tanggal Unggah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-if="beritaData?.length == 0" class="text-center border">
              <td colspan="7">Berita Kosong</td>
            </tr>
            <tr v-for="(berita, i) in beritaData" :key="i">
              <td>{{ (i += lastNumberPage) }}</td>
              <td>
                {{ berita.judul }}
              </td>
              <td>
                {{ berita.isi ? berita.isi.substring(0, 30) + " ..." : "" }}
              </td>
              <td>
                <img
                  :src="berita.foto_path"
                  alt="image"
                  style="max-width: 100px"
                />
              </td>
              <td>{{ berita.nama_user }}</td>
              <td>{{ berita.tanggal_unggah }}</td>
              <td class="text-center">
                <a href="#" @click.prevent="confirmDelete">
                  <i :id="berita.id" class="fas fa-trash"></i>
                </a>
                <router-link
                  :to="{ name: 'Edit Berita', params: { id: berita.id } }"
                >
                  <i class="fas fa-pen ml-3"></i>
                </router-link>
                <!-- <router-link to="/detail-berita">
                  <i class="fas fa-eye ml-3"></i>
                </router-link> -->
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
