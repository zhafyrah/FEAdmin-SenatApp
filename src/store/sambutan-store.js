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
        isLoading: false,
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
            this.isLoading = true

            listSambutanRequest(this.page)
                .then((response) => {
                    this.totalData = response.total
                    this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                    this.lastNoPage = response.from
                    this.sambutanData = response.data
                    this.isLoading = false
                })
                .catch((error) => {
                    if (error.response) {
                        this.errorMessage = error.response.data.message
                    } else if (error.request) {
                        this.errorMessage = error.request
                    } else {
                        this.errorMessage = error.message
                    }
                    this.isLoading = false
                })
        },
        saveSambutan(sambutanForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""
            this.isLoading = true

            insertSambutanRequest(resultSambutanForm(sambutanForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Sambutan Berhasil di Simpan"
                    this.isLoading = false
                }).catch((error) => {
                    if (error.response) {
                        this.errorMessage = error.response.data.message
                    } else if (error.request) {
                        this.errorMessage = error.request
                    } else {
                        this.errorMessage = error.message
                    }
                    this.isLoading = false
                })
        },
        updateSambutan(id, sambutanForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""
            this.isLoading = true

            updateSambutanRequest(id, resultSambutanForm(sambutanForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Sambutan Berhasil di Update"
                    this.isLoading = false
                })
                .catch((error) => {
                    if (error.response) {
                        this.errorMessage = error.response.data.message
                    } else if (error.request) {
                        this.errorMessage = error.request
                    } else {
                        this.errorMessage = error.message
                    }
                    this.isLoading = false
                })
        },
        deleteSambutan(id) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""
            deleteSambutanRequest(id)
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Sambutan Berhasil di Hapus"
                })
                .catch((error) => {
                    if (error.response) {
                        this.errorMessage = error.response.data.message
                    } else if (error.request) {
                        this.errorMessage = error.request
                    } else {
                        this.errorMessage = error.message
                    }
                })
        },
        getSambutanById(id) {
            this.errorMessage = ""
            this.singleData = {}
            getById(id)
                .then((response) => {
                    this.singleData = response.data
                    this.isLoading = true
                })
                .catch((error) => {
                    if (error.response) {
                        this.errorMessage = error.response.data.message
                    } else if (error.request) {
                        this.errorMessage = error.request
                    } else {
                        this.errorMessage = error.message
                    }
                })
        }
    }
})