import './assets/scss/app.scss'
import './style.css'
// import './app.js'
import "vue3-snackbar/styles";
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueSweetalert2 from 'vue-sweetalert2';
import {
    SnackbarService
} from "vue3-snackbar";
import {
    createApp
} from 'vue'
import {
    createPinia
} from 'pinia'
import router from './routes'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(SnackbarService)
app.use(pinia)
app.use(VueSweetalert2);

window.Swal = app.config.globalProperties.$swal;

app.mount('#app')