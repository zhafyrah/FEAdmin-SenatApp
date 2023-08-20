import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    listBeritaRequest,
    insertBeritaRequest,
    updateBeritaRequest,
    deleteBeritaRequest,
    getById
} from '../api/berita-api';
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

function resultBeritaForm(beritaForm, fotoFile) {
    console.log("Result Berita Form")
    console.log(fotoFile);
    const formData = new FormData()
    formData.append('judul', beritaForm.judul)
    formData.append('tanggal_unggah', formatDateToServer(beritaForm.tanggal_unggah))
    formData.append('isi', beritaForm.isi)
    if (fotoFile) {
        formData.append('foto', fotoFile)
    }

    return formData

}
export const useBeritaStore = defineStore("berita", {
    state: () => ({
        beritaData: [],
        beritaSingleData: {
            judul: "",
            tanggal_unggah: "",
            isi: "",
            foto_url: "",
            foto_name: ""
        },
        errorMessage: "",
        totalData: 0,
        page: 1,
        lastPage: 1,
        totalPage: 1,
        lastNoPage: 0,
        isSuccessSubmit: false,
    }),
    actions: {
        clearForm() {
            console.log("clear Form");
            this.beritaSingleData = {
                judul: "",
                tanggal_unggah: "",
                isi: "",
                foto_url: "",
                foto_name: ""
            }
            console.log(this.beritaSingleData)
        },
        async getList() {
            showLoading()
            await listBeritaRequest(this.page)
                .then((response) => {
                    this.totalData = response.total
                    this.currentPage = response.current_page
                    this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                    this.lastNoPage = response.from
                    this.beritaData = response.data

                    loadingOverlay.hide()
                    //console.log('beritastore',response)
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
        saveBerita(beritaForm, fotoFile) {
            showLoading()
            insertBeritaRequest(resultBeritaForm(beritaForm, fotoFile))
                .then((response) => {
                    this.isSuccessSubmit = true
                    //console.log('response', response)
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
        updateBerita(id, beritaForm, fotoFile) {

            showLoading()
            updateBeritaRequest(id, resultBeritaForm(beritaForm, fotoFile))
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
        deleteBerita(id) {
            showLoading()
            deleteBeritaRequest(id)
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
        getBeritaById(id) {
            showLoading()
            getById(id)
                .then((response) => {
                    this.beritaSingleData = response.data
                    loadingOverlay.hide()
                    console.log(this.beritaSingleData)
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