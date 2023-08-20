import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    listKomentarRequest,
    insertKomentarRequest
} from '../api/komentar-pleno-api';
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

export const useKomentarPlenoStore = defineStore("komentar-pleno", {
    state: () => ({
        komentarData: [],
        errorMessage: "",
        totalData: 0,
        page: 1,
        lastPage: 1,
        totalPage: 1,
        lastNoPage: 0,
        isSuccessSubmit: false,
        loadingSubmit: false,
    }),
    actions: {
        getListKomentar(documentId) {
            showLoading()
            listKomentarRequest(this.page, documentId)
                .then((response) => {
                    if (response) {
                        this.totalData = response.total
                        this.currentPage = response.current_page
                        this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                        this.lastNoPage = response.from
                        this.komentarData = response.data
                    }
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
        saveKomentar(komentar, attachmentFile) {
            // showLoading()
            this.loadingSubmit = true
            const form = komentarForm(komentar, attachmentFile)
            insertKomentarRequest(form)
                .then((response) => {
                    this.loadingSubmit = false
                    this.isSuccessSubmit = true

                    this.getListKomentar(komentar.dokId)
                    // loadingOverlay.hide()
                }).catch((error) => {
                    if (error.response) {
                        this.errorMessage = error.response.data.message
                    } else if (error.request) {
                        this.errorMessage = error.request
                    } else {
                        this.errorMessage = error.message
                    }

                    this.loadingSubmit = false
                    loadingOverlay.hide()
                })
        },

    }
})