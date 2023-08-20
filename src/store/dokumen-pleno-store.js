import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    listDokPlenoRequest,
    insertDokPlenoRequest,
    updateDokPlenoRequest,
    deleteDokPlenoRequest,
    getById
} from '../api/dokumen-pleno-api';
import {
    formatDateToServer
} from "../utils/date-utils"
import {
    komentarForm
} from '../utils/form-utils';

const loadingOverlay = useLoading()

function showLoading() {
    loadingOverlay.show({
        color: "#0069d9",
        blur: "5px"
    })
}

function resultDokPlenoForm(dokPlenoForm, dokumenFile) {
    const formData = new FormData()
    formData.append('no_surat', dokPlenoForm.noSurat)
    formData.append('keterangan', dokPlenoForm.keterangan)
    formData.append('tanggal_unggah', formatDateToServer(dokPlenoForm.tanggal_unggah))
    formData.append('status', dokPlenoForm.status)
    if (dokumenFile) {
        formData.append('dokumen', dokumenFile)
    }

    return formData
}

export const useDokPlenoStore = defineStore("dokumen-pleno", {
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
            listDokPlenoRequest(this.page)
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
        saveDokPleno(dokPlenoForm, fotoFile) {
            showLoading()
            insertDokPlenoRequest(resultDokPlenoForm(dokPlenoForm, fotoFile))
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
        updateDokPleno(id, dokPlenoForm, fotoFile) {
            showLoading()
            updateDokPlenoRequest(id, resultDokPlenoForm(dokPlenoForm, fotoFile))
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
        deleteDokPleno(id) {
            showLoading()
            deleteDokPlenoRequest(id)
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
        getDokPlenoById(id) {
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