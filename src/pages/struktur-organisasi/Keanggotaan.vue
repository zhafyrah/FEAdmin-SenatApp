<script setup>
import { useKeanggotaanStore } from "../../store/keanggotaan-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, watch, computed } from "vue";
import Pagination from "../../components/Pagination.vue";
import { showConfirm } from "../../utils/notif-utils";

const keanggotaanStore = useKeanggotaanStore();
const snackbar = useSnackbar();

const keanggotaanData = computed(() => {
  return keanggotaanStore.keanggotaanData;
});

const page = computed(() => {
  return keanggotaanStore.page;
});

const totalPage = computed(() => {
  return keanggotaanStore.totalPage;
});

const lastNumberPage = computed(() => {
  return keanggotaanStore.lastNoPage;
});

onMounted(() => {
  keanggotaanStore.getList();
});

watch(
  () => keanggotaanStore.errorMessage,
  () => {
    if (keanggotaanStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: keanggotaanStore.errorMessage,
      });
    }
  }
);

watch(
  () => keanggotaanStore.isSuccessSubmit,
  () => {
    if (keanggotaanStore.isSuccessSubmit && keanggotaanStore.submitMessage) {
      snackbar.add({
        type: "success",
        text: keanggotaanStore.submitMessage,
      });

      keanggotaanStore.getList();
    }
  }
);

function onCLickNext() {
  if (keanggotaanStore.page < keanggotaanStore.totalPage) {
    keanggotaanStore.page++;
    keanggotaanStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      text: "Sudah Mencapai Halaman Maximum",
    });
  }
}

function onClickPrev() {
  if (keanggotaanStore.page > 0) {
    keanggotaanStore.page--;
    keanggotaanStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      message: "Sudah Mencapai Halaman Minimum",
    });
  }
}

function onClickPaginate(number) {
  keanggotaanStore.page = number;
  keanggotaanStore.getList();
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
        keanggotaanStore.deleteKeanggotaan(e.target.id);
      }
    }
  );
}
</script>
<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <router-link to="/tambah-anggota">
          <button class="btn btn-primary">
            <i class="fas fa-plus mr-1"></i>Tambah Anggota
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

      <div class="card-body table-responsive p-0">
        <table class="table table-hovered table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Pendidikan</th>
              <th>Periode</th>
              <th>Foto</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="keanggotaanData.length == 0" class="text-center border">
              <td colspan="6">Data Keanggotaan Kosong</td>
            </tr>
            <tr v-for="(keanggotaan, i) in keanggotaanData" :key="i">
              <td class="text-center">{{ (i += lastNumberPage) }}</td>
              <td>
                {{ keanggotaan.nama }}
              </td>
              <td>{{ keanggotaan.jabatan }}</td>
              <td>{{ keanggotaan.pendidikan }}</td>
              <td>{{ keanggotaan.periode }}</td>
              <td>
                <img
                  :src="keanggotaan.foto_path"
                  alt="image"
                  style="max-width: 100px; max-height: auto"
                />
              </td>
              <td class="text-center">
                <a href="#" @click.prevent="confirmDelete">
                  <i :id="keanggotaan.id" class="fas fa-trash"></i>
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
