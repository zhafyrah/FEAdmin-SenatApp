<script setup>
import { useBeritaStore } from "../../store/berita-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, watch, computed, ref } from "vue";
import Pagination from "../../components/Pagination.vue";
import { showConfirm } from "../../utils/notif-utils";
import { debounce } from "lodash";
import { formatDateToServer } from "../../utils/date-utils";
import LoadingComponent from "../../components/LoadingComponent.vue";

const beritaStore = useBeritaStore();
const snackbar = useSnackbar();

const beritaData = computed(() => beritaStore.beritaData);
const page = computed(() => beritaStore.page);
const totalPage = computed(() => beritaStore.totalPage);
const lastNumberPage = computed(() => beritaStore.lastNoPage);
const searchQuery = ref("");
const searchResults = ref([]);

const debouncedSearchData = debounce(() => {
  if (searchQuery.value !== "") {
    beritaStore.getList(searchQuery.value);
  } else {
    beritaStore.getList();
  }
}, 500);

watch(
  () => searchQuery.value,
  () => {
    debouncedSearchData();
  }
);

onMounted(async () => {
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

let beritaDetail = ref({});
function setDetail(text) {
  beritaDetail.value = text;
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
              v-model="searchQuery"
              name="table_search"
              class="form-control float-right"
              placeholder="Search"
              @input="searchData"
            />
            <div class="input-group-append">
              <button
                type="button"
                class="btn btn-default"
                @click="searchQuery = ''"
              >
                <i class="fas fa-times"></i>
              </button>
              <button type="button" class="btn btn-default" @click="searchData">
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
              <th>Tanggal Unggah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody class="position-relative">
            <LoadingComponent v-if="beritaStore.isLoading" />
            <tr v-if="beritaData?.length == 0" class="text-center border">
              <td colspan="7">Berita Kosong</td>
            </tr>
            <tr v-for="(berita, i) in beritaData" :key="i">
              <td>{{ (i += lastNumberPage) }}</td>
              <td>
                {{ berita.judul }}
              </td>
              <td>
                {{ berita.isi ? berita.isi.substring(0, 20) + " ..." : "" }}
              </td>
              <td>
                <center>
                  <img
                    :src="berita.foto_path"
                    :alt="berita.foto_name"
                    style="max-width: 200px"
                  />
                </center>
              </td>
              <td>{{ formatDateToServer(berita.tanggal_unggah) }}</td>
              <td class="text-center">
                <a href="#" @click.prevent="confirmDelete">
                  <i :id="berita.id" class="fas fa-trash"></i>
                </a>
                <router-link
                  :to="{ name: 'Edit Berita', params: { id: berita.id } }"
                >
                  <i class="fas fa-pen ml-3"></i>
                </router-link>
                <a
                  data-toggle="modal"
                  data-target="#modalDetailBerita"
                  @click="setDetail(berita.isi)"
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

  <!-- Modal -->
  <div
    class="modal fade bd-example-modal-lg"
    id="modalDetailBerita"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLongTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            Detail Isi Berita
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
        <div class="modal-body">{{ beritaDetail }}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
