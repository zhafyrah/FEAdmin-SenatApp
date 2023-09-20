import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    listUserRequest,
    insertUserRequest,
    updateUserRequest,
    deleteUserRequest,
    getById
} from '../api/user-api';
import {
    formatDateToServer
} from "../utils/date-utils"
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

function resultUserForm(userForm) {
    const formData = new FormData()
    if (userForm.nama) {
        formData.append('nama', userForm.nama)
    }
    if (userForm.nip) {
        formData.append('nip', userForm.nip)
    }
    if (userForm.role) {
        formData.append('role', userForm.role)
    }
    if (userForm.email) {
        formData.append('email', userForm.email)
    }
    if (userForm.password) {
        formData.append('password', userForm.password)
    }

    formData.append('status', parseInt(userForm.status))

    return formData
}

export const useUserStore = defineStore("user", {
    state: () => ({
        userData: [],
        isFinite: false,
        singleData: {},
        errorMessage: "",
        totalData: 0,
        page: 1,
        lastPage: 1,
        totalPage: 1,
        lastNoPage: 0,
        isSuccessSubmit: false,
        isSuccessUpdate: false,
        isSuccessDelete: false,
    }),
    actions: {
        getList(search) {
            this.isLoading = true
            listUserRequest(this.page, search)
                .then((response) => {
                    this.totalData = response.total
                    this.currentPage = response.current_page
                    this.totalPage = response.total > 10 ? Math.ceil(response.total / 10) : 1;
                    this.lastNoPage = response.from
                    this.userData = response.data
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
        saveUser(userForm) {
            this.isLoading = true
            insertUserRequest(resultUserForm(userForm))
                .then((response) => {
                    this.isSuccessSubmit = true
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
        updateUser(id, userForm) {
            this.isLoading = true
            updateUserRequest(id, resultUserForm(userForm))
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
        deleteUser(id) {
            this.isSuccessDelete = false
            this.errorMessage = ""
            deleteUserRequest(id)
                .then((response) => {
                    this.isSuccessDelete = true
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
        getUserById(id) {
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