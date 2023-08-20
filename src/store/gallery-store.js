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
            this.galleryData = []
            this.errorMessage = ""

            showLoading()
            listGalleryRequest(this.page)
                .then((response) => {
                    this.totalData = response.total
                    this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                    this.lastNoPage = response.from
                    this.galleryData = response.data

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
        saveGallery(galleryForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""

            showLoading()
            insertGalleryRequest(resultGalleryForm(galleryForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Gallery Berhasil di Simpan"
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
        updateGallery(id, galleryForm, fotoFile) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""

            showLoading()
            updateGalleryRequest(id, resultGalleryForm(galleryForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Gallery Berhasil di Update"
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
        deleteGallery(id) {
            this.isSuccessSubmit = false
            this.errorMessage = ""
            this.submitMessage = ""

            showLoading()
            deleteGalleryRequest(id)
                .then((response) => {
                    this.isSuccessSubmit = true
                    this.submitMessage = "Data Gallery Berhasil di Hapus"
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
        getGalleryById(id) {
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