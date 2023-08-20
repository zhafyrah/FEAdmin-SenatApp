import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    listKeanggotaanRequest,
    insertKeanggotaanRequest,
    updateKeanggotaanRequest,
    deleteKeanggotaanRequest,
    getById
} from '../api/keanggotaan-api';

const loadingOverlay = useLoading()

function showLoading() {
    loadingOverlay.show({
        color: "#0069d9",
        blur: "5px"
    })
}

function resultKeanggotaanForm(keanggotaanForm, fotoFile) {
    const formData = new FormData()
    formData.append('nama', keanggotaanForm.nama)
    formData.append('jabatan', keanggotaanForm.jabatan)
    formData.append('pendidikan', keanggotaanForm.pendidikan)
    formData.append('periode', keanggotaanForm.periode)
    formData.append('foto', fotoFile)

    return formData
}

export const useKeanggotaanStore = defineStore("keanggotaan", {
    state: () => ({
        keanggotaanData: [],
        singleData: {},
        errorMessage: "",
        totalData: 0,
        page: 1,
        lastPage: 1,
        totalPage: 1,
        lastNoPage: 0,
        isSuccessSubmit: false,
        submitMessage: ""
    }),
    actions: {
        async getList() {
            this.totalData = 0
            this.totalPage = 1
            this.lastNoPage = 0
            this.keanggotaanData = []
            this.errorMessage = ""

            showLoading()
            await listKeanggotaanRequest(this.page)
                .then((response) => {
                    this.totalData = response.total
                    this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                    this.lastNoPage = response.from
                    this.keanggotaanData = response.data

                    loadingOverlay.hide()
                })
                .catch((error) => {
                    if (error.response) {
                        this.errorMessage = error.response.data.message
                    } else if (error.request) {
                        this.errorMessage = error.request
                    } else {
                        this.errorMessage = error.message
                    }

                    loadingOverlay.hide()
                })
        },
        saveKeanggotaan(keanggotaanForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""

            showLoading()
            insertKeanggotaanRequest(resultKeanggotaanForm(keanggotaanForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Keanggotaan Berhasil di Simpan"
                    loadingOverlay.hide()
                }).catch((error) => {
                    if (error.response) {
                        this.errorMessage = error.response.data.message
                    } else if (error.request) {
                        this.errorMessage = error.request
                    } else {
                        this.errorMessage = error.message
                    }

                    loadingOverlay.hide()
                })
        },
        updateKeanggotaan(id, keanggotaanForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""

            showLoading()
            updateKeanggotaanRequest(id, resultKeanggotaanForm(keanggotaanForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Keanggotaan Berhasil di Update"
                    loadingOverlay.hide()
                })
                .catch((error) => {
                    if (error.response) {
                        this.errorMessage = error.response.data.message
                    } else if (error.request) {
                        this.errorMessage = error.request
                    } else {
                        this.errorMessage = error.message
                    }

                    loadingOverlay.hide()
                })
        },
        deleteKeanggotaan(id) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""

            showLoading()
            deleteKeanggotaanRequest(id)
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Keanggotaan Berhasil di Hapus"
                    loadingOverlay.hide()
                })
                .catch((error) => {
                    if (error.response) {
                        this.errorMessage = error.response.data.message
                    } else if (error.request) {
                        this.errorMessage = error.request
                    } else {
                        this.errorMessage = error.message
                    }

                    loadingOverlay.hide()
                })
        },
        getKeanggotaanById(id) {
            this.errorMessage = ""
            this.singleData = {}

            showLoading()
            getById(id)
                .then((response) => {
                    this.singleData = response.data
                    loadingOverlay.hide()
                })
                .catch((error) => {
                    if (error.response) {
                        this.errorMessage = error.response.data.message
                    } else if (error.request) {
                        this.errorMessage = error.request
                    } else {
                        this.errorMessage = error.message
                    }

                    loadingOverlay.hide()
                })
        }
    }
})