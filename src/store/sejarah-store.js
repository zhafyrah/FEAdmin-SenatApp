import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    listSejarahRequest,
    insertSejarahRequest,
    updateSejarahRequest,
    deleteSejarahRequest,
    getById
} from '../api/sejarah-api';

const loadingOverlay = useLoading()

function showLoading() {
    loadingOverlay.show({
        color: "#0069d9",
        blur: "5px"
    })
}

function resultSejarahForm(sejarahForm, fotoFile) {
    const formData = new FormData()
    formData.append('judul', sejarahForm.judul)
    formData.append('isi', sejarahForm.isi)
    // formData.append('foto', fotoFile)
    if (fotoFile) {
        formData.append('foto', fotoFile)
    }
    return formData

}

export const useSejarahStore = defineStore("sejarah", {
    state: () => ({
        sejarahData: [],
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
            this.sejarahData = []
            this.errorMessage = ""

            showLoading()
            listSejarahRequest(this.page)
                .then((response) => {
                    this.totalData = response.total
                    this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                    this.lastNoPage = response.from
                    this.sejarahData = response.data

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
        saveSejarah(sejarahForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""

            showLoading()
            insertSejarahRequest(resultSejarahForm(sejarahForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Sejarah Berhasil di Simpan"
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
        updateSejarah(id, sejarahForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""

            showLoading()
            updateSejarahRequest(id, resultSejarahForm(sejarahForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Sejarah Berhasil di Update"
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
        deleteSejarah(id) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""

            showLoading()
            deleteSejarahRequest(id)
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Sejarah Berhasil di Hapus"
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
        getSejarahById(id) {
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