import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    getMstRolesRequest
} from '../api/master-api';

const loadingOverlay = useLoading()

function showLoading() {
    loadingOverlay.show({
        color: "#0069d9",
        blur: "5px"
    })
}

export const useMstStore = defineStore("mst", {
    state: () => ({
        roleData: [],
        errorMessage: "",
    }),
    actions: {
        getRoles() {
            showLoading()
            getMstRolesRequest()
                .then((response) => {
                    this.roleData = response.data

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

                    this.isLoading = true
                })
        },

    }
})