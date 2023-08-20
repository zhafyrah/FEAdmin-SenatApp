<script setup>
import { useSejarahStore } from "../../store/sejarah-store";
import { useSnackbar } from "vue3-snackbar";
import { onMounted, watch, computed } from "vue";
import { ref } from "vue";
import Pagination from "../../components/Pagination.vue";
import { showConfirm } from "../../utils/notif-utils";

const sejarahStore = useSejarahStore();
const snackbar = useSnackbar();

const sejarahData = computed(() => {
  return sejarahStore.sejarahData;
});
let sejarahDetail = ref({});
function setDetail(text) {
  //complete here, ref isnot defined
  sejarahDetail.value = text;
}
const page = computed(() => {
  return sejarahStore.page;
});

const totalPage = computed(() => {
  return sejarahStore.totalPage;
});

onMounted(() => {
  sejarahStore.getList();
});

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
    if (sejarahStore.isSuccessSubmit && sejarahStore.submitMessage) {
      snackbar.add({
        type: "success",
        text: sejarahStore.submitMessage,
      });

      sejarahStore.getList();
    }
  }
);

function onCLickNext() {
  if (sejarahStore.page < sejarahStore.totalPage) {
    sejarahStore.page++;
    sejarahStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      text: "Sudah Mencapai Halaman Maximum",
    });
  }
}

function onClickPrev() {
  if (sejarahStore.page > 0) {
    sejarahStore.page--;
    sejarahStore.getList();
  } else {
    snackbar.add({
      type: "warning",
      message: "Sudah Mencapai Halaman Minimum",
    });
  }
}

function onClickPaginate(number) {
  sejarahStore.page = number;
  sejarahStore.getList();
}

function shortIsiSejarah(text, maxLength) {
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
        sejarahStore.deleteSejarah(e.target.id);
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
                <div v-if="sejarahData.length == 0" class="card-tools">
                  <router-link to="/tambah-sejarah" class="btn btn-primary">
                    <i class="fas fa-plus mr-1"></i> Tambah Sejarah
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
                <tbody>
                  <tr v-if="sejarahData.length == 0" class="text-center border">
                    <td colspan="3">Data Sejarah Kosong</td>
                  </tr>
                  <tr v-for="(sejarah, i) in sejarahData" :key="i">
                    <td>
                      {{ sejarah.judul }}
                    </td>
                    <td>{{ shortIsiSejarah(sejarah.isi, 50) }}</td>
                    <td>
                      <img
                        :src="sejarah.foto_url"
                        alt="image"
                        style="max-width: 100px; max-height: auto"
                      />
                    </td>
                    <td class="text-left ml-3">
                      <a href="#" @click.prevent="confirmDelete">
                        <i :id="sejarah.id" class="fas fa-trash"></i>
                      </a>
                      <router-link
                        :to="{
                          name: 'Edit Sejarah Polindra',
                          params: { id: sejarah.id },
                        }"
                      >
                        <i class="fas fa-pen ml-3"></i>
                      </router-link>
                      <a
                        data-toggle="modal"
                        data-target="#modalDetail"
                        @click="setDetail(sejarah.isi)"
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
        <div class="modal-body">{{ sejarahDetail }}</div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
