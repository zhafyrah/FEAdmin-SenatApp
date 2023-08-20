import {
    defineStore
} from 'pinia'
import {
    loginRequest
} from "../api/auth-api"
import {
    useLoading
} from 'vue3-loading-overlay';

const loadingOverlay = useLoading()

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isError: false,
        isSuccess: false,
        responseMessage: ""
    }),
    actions: {
        submitLogin(email, password, remember) {
            //reset state
            this.isError = false
            this.responseMessage = ""

            loadingOverlay.show({
                color: "#0069d9",
                blur: "5px"
            })

            loginRequest(email, password)
                .then((response) => {
                    if (remember) {
                        localStorage.setItem("remember", {
                            email: email,
                            password: password,
                        })
                    } else {
                        localStorage.setItem("remember", null)
                    }

                    saveUserSession(response.data.user, response.data.permission)
                    this.isSuccess = true
                    loadingOverlay.hide()
                })
                .catch((error) => {
                    if (error.response) {
                        this.responseMessage = error.response.data.message
                    } else if (error.request) {
                        this.responseMessage = error.request
                    } else {
                        this.responseMessage = error.message
                    }

                    this.isError = true
                    loadingOverlay.hide()
                })
        },
        submitLogout() {
            localStorage.removeItem("user")
            localStorage.removeItem("permission")
        }
    }
})

export function useUserSession() {
    if (localStorage.getItem("user")) {
        return {
            user: JSON.parse(localStorage.getItem("user")),
            permission: JSON.parse(localStorage.getItem("permission")),
        }
    }

    return {}
}

function saveUserSession(user, permission) {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("permission", JSON.stringify(permission))
}