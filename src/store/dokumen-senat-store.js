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
        getList() {
            showLoading()
            listDokSenatRequest(this.page)
                .then((response) => {
                    this.totalData = response.total
                    this.currentPage = response.current_page
                    this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                    this.lastNoPage = response.from
                    this.dokData = response.data

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
        saveDokSenat(dokSenatForm, fotoFile) {
            showLoading()
            insertDokSenatRequest(resultDokSenatForm(dokSenatForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
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
        updateDokSemat(id, dokSenatForm, fotoFile) {
            showLoading()
            updateDokSenatRequest(id, resultDokSenatForm(dokSenatForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
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
        deleteDokSenat(id) {
            showLoading()
            deleteDokSenatRequest(id)
                .then((response) => {
                    this.isSuccessSubmit = true
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
        getDokSenatById(id) {
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
        },
    }
})