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
        isLoading: false,
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
            listDokPlenoRequest(this.page, search)
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
        saveDokPleno(dokPlenoForm, fotoFile) {
            this.isLoading = true
            insertDokPlenoRequest(resultDokPlenoForm(dokPlenoForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.isLoading = false;
                }).catch((error) => {
                    if (error.response) {
                        this.errorMessage = error.response.data.message
                    } else if (error.request) {
                        this.errorMessage = error.request
                    } else {
                        this.errorMessage = error.message
                    }
                    this.isLoading = false;
                })
        },
        updateDokPleno(id, dokPlenoForm, fotoFile) {
            this.isLoading = true;
            updateDokPlenoRequest(id, resultDokPlenoForm(dokPlenoForm, fotoFile))
                .then((response) => {
                    this.isLoading = false;
                    this.isSuccessSubmit = true
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
            this.isLoading = false;
        },
        deleteDokPleno(id) {
            deleteDokPlenoRequest(id)
                .then((response) => {
                    this.isSuccessSubmit = true
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
        getDokPlenoById(id) {
            getById(id)
                .then((response) => {
                    this.singleData = response.data
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