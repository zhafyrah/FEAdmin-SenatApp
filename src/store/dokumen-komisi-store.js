import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    listDokKomisiRequest,
    insertDokKomisiRequest,
    updateDokKomisiRequest,
    deleteDokKomisiRequest,
    getById
} from '../api/dokumen-komisi-api';
import {
    formatDateToServer
} from "../utils/date-utils"

const loadingOverlay = useLoading()

function showLoading() {

    loadingOverlay.show({
        color: "#0069d9",
        blur: "5px"
    })
}

function resultDokKomisiForm(dokKomisiForm, dokumenFile) {
    const formData = new FormData()
    formData.append('no_surat', dokKomisiForm.noSurat)
    formData.append('keterangan', dokKomisiForm.keterangan)
    formData.append('tanggal_unggah', formatDateToServer(dokKomisiForm.tanggal_unggah))
    if (dokumenFile) {
        formData.append('dokumen', dokumenFile)
    }


    return formData
}

export const useDokKomisiStore = defineStore("dokumen-komisi", {
    state: () => ({
        dokData: [],
        komentarData: [],
        isLoading: false,
        singleData: {},
        errorMessage: "",
        totalData: 0,
        page: 1,
        lastPage: 1,
        totalPage: 1,
        lastNoPage: 0,
        isSuccessSubmit: false,
    }),
    actions: {
        getList(search) {
            this.isLoading = true
            listDokKomisiRequest(this.page, search)
                .then((response) => {
                    this.totalData = response.total
                    this.currentPage = response.current_page
                    this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                    this.lastNoPage = response.from
                    this.dokData = response.data
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
        saveDokKomisi(dokKomisiForm, dokumenFile) {
            this.isLoading = true
            insertDokKomisiRequest(resultDokKomisiForm(dokKomisiForm, dokumenFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.isLoading = true
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
        updateDokKomisi(id, dokKomisiForm, dokumenFile) {
            this.isLoading = true
            updateDokKomisiRequest(id, resultDokKomisiForm(dokKomisiForm, dokumenFile))
                .then((response) => {
                    this.isSuccessSubmit = true
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
        deleteDokKomisi(id) {
            deleteDokKomisiRequest(id)
                .then((response) => {
                    this.isSuccessSubmit = true
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
        },
        getDokKomisiById(id) {
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