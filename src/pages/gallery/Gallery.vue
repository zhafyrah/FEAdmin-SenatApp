<script setup>
import { useGalleryStore } from "../../store/gallery-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, watch, computed, ref } from "vue";
import Pagination from "../../components/Pagination.vue";
import { showConfirm } from "../../utils/notif-utils";
import { debounce } from "lodash";
import { formatDateToServer } from "../../utils/date-utils";
import LoadingComponent from "../../components/LoadingComponent.vue";

const galleryStore = useGalleryStore();
const snackbar = useSnackbar();

const galleryData = computed(() => {
  return galleryStore.galleryData;
});

const page = computed(() => {
  return galleryStore.page;
});

const totalPage = computed(() => {
  return galleryStore.totalPage;
});

const lastNumberPage = computed(() => {
  return galleryStore.lastNoPage;
});

const searchQuery = ref("");
const searchResults = ref([]);

const debouncedSearchData = debounce(() => {
  if (searchQuery.value !== "") {
    galleryStore.getList(searchQuery.value);
  } else {
    galleryStore.getList();
  }
}, 500);

watch(
  () => searchQuery.value,
  () => {
    debouncedSearchData();
  }
);

onMounted(() => {
  galleryStore.getList();
});

watch(
  () => galleryStore.errorMessage,
  () => {
    if (galleryStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: galleryStore.errorMessage,
      });
    }
  }
);

watch(
  () => galleryStore.isSuccessSubmit,
  () => {
    if (galleryStore.isSuccessSubmit && galleryStore.submitMessage) {
      snackbar.add({
        type: "success",
        text: galleryStore.submitMessage,
      });

      galleryStore.getList();
    }
  }
);

function onCLickNext() {
  if (galleryStore.page < galleryStore.totalPage) {
    galleryStore.page++;
    galleryStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      text: "Sudah Mencapai Halaman Maximum",
    });
  }
}

function onClickPrev() {
  if (galleryStore.page > 0) {
    galleryStore.page--;
    galleryStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      message: "Sudah Mencapai Halaman Minimum",
    });
  }
}

function onClickPaginate(number) {
  galleryStore.page = number;
  galleryStore.getList();
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
        galleryStore.deleteGallery(e.target.id);
      }
    }
  );
}
</script>
<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <router-link to="/tambah-foto">
          <button class="btn btn-primary">
            <i class="fas fa-plus mr-1"></i>Unggah Foto
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
      <div class="card-body table-responsive p-0">
        <table class="table table-hovered table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Foto</th>
              <th>Keterangan</th>
              <th>Tanggal Unggah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody class="position-relative">
            <LoadingComponent v-if="galleryStore.isLoading" />
            <tr v-if="galleryData.length == 0" class="text-center border">
              <td colspan="5">Data Galeri Kosong</td>
            </tr>
            <tr v-for="(gallery, i) in galleryData" :key="i">
              <td class="text-center">{{ (i += lastNumberPage) }}</td>
              <td>
                <img
                  :src="gallery.foto_path"
                  :alt="gallery.foto_name"
                  style="max-width: 100px; max-height: auto"
                />
              </td>
              <td>{{ gallery.keterangan }}</td>
              <td>{{ formatDateToServer(gallery.created_at) }}</td>
              <td class="text-center">
                <a href="#" @click.prevent="confirmDelete">
                  <i :id="gallery.id" class="fas fa-trash"></i>
                </a>
                <!-- <router-link
                  :to="{ name: 'Edit Foto', params: { id: gallery.id } }"
                >
                  <i class="fas fa-pen ml-3"></i>
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
