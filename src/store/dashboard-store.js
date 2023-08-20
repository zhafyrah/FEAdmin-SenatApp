import {
    defineStore
} from 'pinia'
import {
    useLoading
} from 'vue3-loading-overlay';
import {
    getDashboardRequest
} from '../api/dashboard-api';

const loadingOverlay = useLoading()

function showLoading() {
    loadingOverlay.show({
        color: "#0069d9",
        blur: "5px"
    })
}

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        dashboardData: {},
        chartData: {
            labels: [],
            data: [],
        },
        errorMessage: "",
    }),
    actions: {
        getDashboard() {
            showLoading()
            getDashboardRequest('')
                .then((response) => {
                    this.dashboardData = response.data
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
        getChartData() {
            getDashboardRequest('chart-dokumen').then((res) => {
                const chartDataResponse = res;
                this.chartData.data = chartDataResponse.map(item => item.count)
                this.chartData.labels = chartDataResponse.map(item => item.month)
            })
        }
    },

})