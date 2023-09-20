import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    listSejarahSenatRequest,
    insertSejarahSenatRequest,
    updateSejarahSenatRequest,
    deleteSejarahSenatRequest,
    getById
} from '../api/sejarah-senat-api';

const loadingOverlay = useLoading()

function showLoading() {
    loadingOverlay.show({
        color: "#0069d9",
        blur: "5px"
    })
}

function resultSejarahSenatForm(sejarahSenatForm, fotoFile) {
    const formData = new FormData()
    formData.append('judul', sejarahSenatForm.judul)
    formData.append('isi', sejarahSenatForm.isi)
    if (fotoFile) {
        formData.append('foto', fotoFile)
    }
    return formData

}

export const useSejarahSenatStore = defineStore("sejarah", {
    state: () => ({
        sejarahSenatData: [],
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
            this.sejarahSenatData = []
            this.errorMessage = ""
            this.isLoading = true

            listSejarahSenatRequest(this.page)
                .then((response) => {
                    this.totalData = response.total
                    this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                    this.lastNoPage = response.from
                    this.sejarahSenatData = response.data
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
        saveSejarahSenat(sejarahSenatForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""
            this.isLoading = true

            insertSejarahSenatRequest(resultSejarahSenatForm(sejarahSenatForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Sejarah Senat Berhasil di Simpan"
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
        updateSejarahSenat(id, sejarahSenatForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""
            this.isLoading = true

            updateSejarahSenatRequest(id, resultSejarahSenatForm(sejarahSenatForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Sejarah Senat Berhasil di Update"
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
        deleteSejarahSenat(id) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""
            deleteSejarahSenatRequest(id)
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Sejarah Senat Berhasil di Hapus"
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
        getSejarahSenatById(id) {
            this.errorMessage = ""
            this.singleData = {}
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
        }
    }
})