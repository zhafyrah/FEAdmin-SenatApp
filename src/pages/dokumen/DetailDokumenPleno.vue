<script setup>
import { useDokPlenoStore } from "../../store/dokumen-pleno-store"
import { useKomentarPlenoStore } from "../../store/komentar-pleno-store"
import { useSnackbar } from "vue3-snackbar";
import { onMounted, ref, watch, computed, reactive } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { formatDateTimeFromServer } from "../../utils/date-utils"
import LoadingComponent from "../../components/LoadingComponent.vue";

const dokStore = useDokPlenoStore()
const komentarStore = useKomentarPlenoStore()
const snackbar = useSnackbar()
const route = useRoute()

const { komentarData, loadingSubmit } = storeToRefs(komentarStore)

const initialKomentarForm = () => ({
    dokId: route.params.id,
    komentar: '',
})

const komentarForm = reactive(initialKomentarForm());

const attachmentFile = ref(null)

komentarStore.$subscribe((mutations, state) => {
})

watch(
    () => komentarStore.errorMessage,
    () => {
        if (komentarStore.errorMessage)
        {
            snackbar.add({
                type: 'error',
                text: komentarStore.errorMessage,
            })
        }
    }
)

watch(
    () => komentarStore.isSuccessSubmit,
    () => {
        Object.assign(komentarForm, initialKomentarForm())
        snackbar.add({
            type: 'success',
            text: "Komentar Berhasil di Tambahkan",
        })
    }
)

function onChangeFile(e) {
    attachmentFile.value = e.target.files[0]
}

function onSubmit(e) {
    e.preventDefault();
    komentarStore.saveKomentar(komentarForm, attachmentFile.value)
    komentarForm.komentar = ""
}

onMounted(() => {
    dokStore.getDokPlenoById(route.params.id)
    komentarStore.getListKomentar(route.params.id)
})

</script>
<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                    <div class="row p-3">
                        <div class="col-12">
                            <!-- diambil dari nomor dokumen -->
                            <h4>Nomor Dokumen: {{ dokStore.singleData.no_surat }}</h4>
                            <div class="row">
                                <iframe :src="dokStore.singleData.dokumen_url" frameborder="0" width="100%" height="800"></iframe>
                            </div>
                            <div class="mt-3">
                                <h4>Komentar</h4>
                                <div v-if="komentarData.length == 0" class="text-center">
                                    Tidak Ada Komentar
                                </div>
                                <div v-else class="post" v-for="(komentar, i) in komentarData" :key="i">
                                    <div class="user">
                                        <span class="username" style="color:blue">
                                            {{ komentar.nama_user }}
                                        </span>
                                    </div>
                                    <p>
                                        {{ komentar.komentar }}
                                    <p>
                                        {{ formatDateTimeFromServer(komentar.created_at) }}
                                    </p>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mt-5">
                            <form class="form" @submit.prevent="onSubmit">
                            <LoadingComponent v-if="komentarStore.isLoading" />
                                <div class="form-group">
                                    <textarea class="form-control" placeholder="Tulis Komentar"
                                        v-model="komentarForm.komentar"></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">
                                    <span v-if="loadingSubmit" class="text-center spinner-border"></span>
                                    <span v-else>Komentar</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-12 col-lg-4 order-1 order-md-2 p-3">
                    <h4 class="text-block">Keterangan</h4>
                    <p class="text-muted">
                        {{ dokStore.singleData.keterangan }}
                    </p>
                    <hr />
                    <div class="text-muted">
                        <p class="text">
                            Tanggal Unggah
                            <b class="d-block">{{ dokStore.singleData.tanggal_unggah }}</b>
                        </p>
                        <!-- status bisa diupdate disini -->
                        <div class="form-group" hidden>
                        <p class="text">Status Dokumen</p>
                            <select class="form-control select" style="width: 100%" placeholder="Silahkan Pilih Status" hidden>
                                <option selected disabled>Silahkan Pilih Status</option>
                                <option select-id="Belum Disahkan">Belum Disahkan</option>
                                <option select-id="Dipertimbangkan">Dipertimbangkan</option>
                                <option select-id="Disahkan">Disahkan</option>
                            </select>
                        </div>
                    </div>
                    <router-link to="dokumen" class="btn btn-primary" hidden>
                        Simpan Update</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
