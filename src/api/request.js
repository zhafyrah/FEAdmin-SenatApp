import axios from "axios";
import {
    useUserSession
} from '../store/auth-store'
import {
    useRouter,
    useRoute
} from "vue-router";

const userSession = useUserSession()
const router = useRouter()

let baseUrl =
    import.meta.env.VITE_BASE_API_URL

if (Object.keys(userSession).length === 0) {
    /* router.push({
        path: '/auth/login'
    }) */
}

if (
    import.meta.env.PROD) {
    //production mode
    //baseUrl = ""
}

const moreOptions = Object.keys(userSession).length > 0 ? {
    userId: userSession.user.id

} : {}

const service = axios.create({
    baseURL: baseUrl,
    timeout: 50000, // Request timeou
    headers: {
        ...moreOptions
    }
});

// Request intercepter
service.interceptors.request.use(
    config => {
        // const token = isLogged();
        // if (token) {
        //   config.headers['Authorization'] = 'Bearer ' + isLogged(); // Set JWT token
        // }

        if (Object.keys(userSession).length > 0) {
            if (config.data) {
                config.data['userId'] = userSession.user.id
            }
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default service;