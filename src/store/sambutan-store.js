import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    listSambutanRequest,
    insertSambutanRequest,
    updateSambutanRequest,
    deleteSambutanRequest,
    getById
} from '../api/sambutan-api';

const loadingOverlay = useLoading()

function showLoading() {
    loadingOverlay.show({
        color: "#0069d9",
        blur: "5px"
    })
}

function resultSambutanForm(sambutanForm, fotoFile) {
    const formData = new FormData()
    formData.append('nama_ketua_senat', sambutanForm.namaKetuaSenat)
    formData.append('judul', sambutanForm.judul)
    formData.append('isi', sambutanForm.isi)
    if (fotoFile) {
        formData.append('foto', fotoFile)
    }

    return formData
}

export const useSambutanStore = defineStore("sambutan", {
    state: () => ({
        sambutanData: [],
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
        getList() {
            this.totalData = 0
            this.totalPage = 1
            this.lastNoPage = 0
            this.sambutanData = []
            this.errorMessage = ""

            showLoading()
            listSambutanRequest(this.page)
                .then((response) => {
                    this.totalData = response.total
                    this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                    this.lastNoPage = response.from
                    this.sambutanData = response.data

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
        saveSambutan(sambutanForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""

            showLoading()
            insertSambutanRequest(resultSambutanForm(sambutanForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Sambutan Berhasil di Simpan"
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
        updateSambutan(id, sambutanForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""

            showLoading()
            updateSambutanRequest(id, resultSambutanForm(sambutanForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Sambutan Berhasil di Update"
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
        deleteSambutan(id) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""

            showLoading()
            deleteSambutanRequest(id)
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Sambutan Berhasil di Hapus"
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
        getSambutanById(id) {
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