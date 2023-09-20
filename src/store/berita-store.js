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
        isLoading: false,
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
            this.beritaSingleData = {
                judul: "",
                tanggal_unggah: "",
                isi: "",
                foto_url: "",
                foto_name: ""
            }
        },
        async getList(search) {
            this.isLoading = true;
            await listBeritaRequest(this.page, search)
                .then((response) => {
                    this.totalData = response.total
                    this.currentPage = response.current_page
                    this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                    this.lastNoPage = response.from
                    this.beritaData = response.data

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
        saveBerita(beritaForm, fotoFile) {
            this.isLoading = true
            insertBeritaRequest(resultBeritaForm(beritaForm, fotoFile))
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
        updateBerita(id, beritaForm, fotoFile) {
            this.isLoading = true;
            updateBeritaRequest(id, resultBeritaForm(beritaForm, fotoFile))
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
        deleteBerita(id) {
            deleteBeritaRequest(id)
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
        getBeritaById(id) {
            getById(id)
                .then((response) => {
                    this.beritaSingleData = response.data
                    this.isLoading = true
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
                })
        },
    }
})