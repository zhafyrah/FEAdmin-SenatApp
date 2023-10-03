<script setup>
import { useFungsiKerjaStore } from "../../store/fungsi-kerja-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, watch, computed, ref } from "vue";
import Pagination from "../../components/Pagination.vue";
import { showConfirm } from "../../utils/notif-utils";
import { debounce } from "lodash";
import LoadingComponent from "../../components/LoadingComponent.vue";

const fungsiKerjaStore = useFungsiKerjaStore();
const snackbar = useSnackbar();

const fungsiKerjaData = computed(() => {
  return fungsiKerjaStore.fungsiKerjaData;
});

const page = computed(() => {
  return fungsiKerjaStore.page;
});

const totalPage = computed(() => {
  return fungsiKerjaStore.totalPage;
});

const lastNumberPage = computed(() => {
  return fungsiKerjaStore.lastNoPage;
});

const searchQuery = ref("");
const searchResults = ref([]);

const debouncedSearchData = debounce(() => {
  if (searchQuery.value !== "") {
    fungsiKerjaStore.getList(searchQuery.value);
  } else {
    fungsiKerjaStore.getList();
  }
}, 500);

watch(
  () => searchQuery.value,
  () => {
    debouncedSearchData();
  }
);

onMounted(() => {
  fungsiKerjaStore.getList();
});

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
    if (fungsiKerjaStore.isSuccessSubmit && fungsiKerjaStore.submitMessage) {
      snackbar.add({
        type: "success",
        text: fungsiKerjaStore.submitMessage,
      });

      fungsiKerjaStore.getList();
    }
  }
);

function onCLickNext() {
  if (fungsiKerjaStore.page < fungsiKerjaStore.totalPage) {
    fungsiKerjaStore.page++;
    fungsiKerjaStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      text: "Sudah Mencapai Halaman Maximum",
    });
  }
}

function onClickPrev() {
  if (fungsiKerjaStore.page > 0) {
    fungsiKerjaStore.page--;
    fungsiKerjaStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      message: "Sudah Mencapai Halaman Minimum",
    });
  }
}

function onClickPaginate(number) {
  fungsiKerjaStore.page = number;
  fungsiKerjaStore.getList();
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
        fungsiKerjaStore.deleteFungsiKerja(e.target.id);
      }
    }
  );
}

const anggota = (anggota1, anggota2, anggota3) => {
  var result = [anggota1, anggota2, anggota3]
    .map((value, index) => {
      index++;
      return `${index}. ${value}`;
    })
    .join("\n");
  return result;
};
</script>
<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <router-link to="/tambah-fungsi">
          <button class="btn btn-primary">
            <i class="fas fa-plus mr-1"></i>Tambah Fungsi
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
              <th>Komisi</th>
              <th>Nama Komisi</th>
              <th>Ketua Komisi</th>
              <th>Anggota</th>
              <th>Fungsi Kerja</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody class="position-relative">
            <LoadingComponent v-if="fungsiKerjaStore.isLoading" />
            <tr v-if="fungsiKerjaData.length == 0" class="text-center border">
              <td colspan="6">Data Fungsi Kerja Kosong</td>
            </tr>
            <tr v-for="(fungsiKerja, i) in fungsiKerjaData" :key="i">
              <td class="text-left">{{ (i += lastNumberPage) }}</td>
              <td>
                {{ fungsiKerja.komisi }}
              </td>
              <th>{{ fungsiKerja.nama_komisi }}</th>
              <td>{{ fungsiKerja.ketua_komisi }}</td>
              <td style="white-space: pre-line" class="text-center">
                <div
                  v-for="(anggota, index) in fungsiKerja.anggota"
                  :key="anggota.id"
                  style="margin-bottom: 5px"
                >
                  <span class="mb-2" style="text-align: justify"
                    >{{ index + 1 }}. {{ anggota.nama_anggota }}</span
                  >
                </div>
              </td>
              <td>{{ fungsiKerja.fungsi_kerja }}</td>
              <td class="text-center">
                <a href="#" @click.prevent="confirmDelete">
                  <i :id="fungsiKerja.id" class="fas fa-trash"></i>
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
</template>
