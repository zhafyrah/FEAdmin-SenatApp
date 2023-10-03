import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    listGalleryRequest,
    insertGalleryRequest,
    updateGalleryRequest,
    deleteGalleryRequest,
    getById
} from '../api/gallery-api';

const loadingOverlay = useLoading()

function showLoading() {
    loadingOverlay.show({
        color: "#0069d9",
        blur: "5px"
    })
}

function resultGalleryForm(galleryForm, fotoFile) {
    const formData = new FormData()
    formData.append('keterangan', galleryForm.keterangan)
    formData.append('foto', fotoFile)
    return formData
}

export const useGalleryStore = defineStore("gallery", {
    state: () => ({
        galleryData: [],
        singleData: {},
        isLoading: false,
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
        getList(search) {
            this.totalData = 0
            this.totalPage = 1
            this.lastNoPage = 0
            this.galleryData = []
            this.errorMessage = ""
            this.isLoading = true
            listGalleryRequest(this.page, search)
                .then((response) => {
                    this.totalData = response.total
                    this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                    this.lastNoPage = response.from
                    this.galleryData = response.data
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
        saveGallery(galleryForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""
            this.isLoading = true
            insertGalleryRequest(resultGalleryForm(galleryForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data galeri berhasil disimpan"
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
        updateGallery(id, galleryForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""
            this.isLoading = true
            updateGalleryRequest(id, resultGalleryForm(galleryForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data galeri berhasil diperbarui"
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
        deleteGallery(id) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""
            deleteGalleryRequest(id)
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data galeri berhasil dihapus"
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
        getGalleryById(id) {
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