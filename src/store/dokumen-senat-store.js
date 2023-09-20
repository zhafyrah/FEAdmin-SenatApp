import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    listDokSenatRequest,
    insertDokSenatRequest,
    updateDokSenatRequest,
    deleteDokSenatRequest,
    getById
} from '../api/dokumen-senat-api';
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

function resultDokSenatForm(dokSenatForm, dokumenFile) {
    const formData = new FormData()
    formData.append('judul_dokumen', dokSenatForm.noSurat)
    formData.append('keterangan', dokSenatForm.keterangan)
    formData.append('tanggal_unggah', formatDateToServer(dokSenatForm.tanggal_unggah))
    formData.append('link_url', dokSenatForm.link_url)
    if (dokumenFile) {
        formData.append('dokumen', dokumenFile)
    }


    return formData
}

export const useDokSenatStore = defineStore("dokumen-senat", {
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
            listDokSenatRequest(this.page, search)
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
        saveDokSenat(dokSenatForm, fotoFile) {
            this.isLoading = true
            insertDokSenatRequest(resultDokSenatForm(dokSenatForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
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
        updateDokSemat(id, dokSenatForm, fotoFile) {
            this.isLoading = true
            updateDokSenatRequest(id, resultDokSenatForm(dokSenatForm, fotoFile))
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
        deleteDokSenat(id) {
            deleteDokSenatRequest(id)
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
        getDokSenatById(id) {
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
        },
    }
})