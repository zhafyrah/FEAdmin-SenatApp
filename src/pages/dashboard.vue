<script setup>
import { onMounted, watch, computed, ref } from "vue";
import { useDashboardStore } from "../store/dashboard-store";
import { useSnackbar } from "vue3-snackbar";
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { storeToRefs } from "pinia";
import axios from "axios";

Chart.register(...registerables);

const dashboardStore = useDashboardStore();
const snackbar = useSnackbar();

const { dashboardData } = storeToRefs(dashboardStore);

let data = ref([]);

const options = computed(() => ({
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        },
      },
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "xy",
      },
    },
  },
}));

const getDataDashboard = () => {
  //   axios.defaults.baseURL = "https://api.zhanah-polindra.xyz/api/";
  axios.defaults.baseURL = "http://localhost:8000/api/";
  axios
    .get("dashboard")
    .then((result) => {
      data = result.data.data;
    })
    .catch((err) => {});
};

const chartData = computed(() => ({
  labels: dashboardStore.chartData.labels,
  datasets: [
    {
      data: dashboardStore.chartData.data,
      label: "Total Per-Bulan",
      backgroundColor: "#007bff",
    },
  ],
}));

const { barChartProps, barChartRef } = useBarChart({
  chartData,
  options: options,
});

onMounted(() => {
  dashboardStore.getChartData();
  //   dashboardStore.getDashboard();
  getDataDashboard();
});

watch(
  () => dashboardStore.errorMessage,
  () => {
    if (dashboardStore.errorMessage) {
      snackbar.add({
        type: "error",
        text: dashboardStore.errorMessage,
      });
    }
  }
);
</script>

<template>
  <div class="row">
    <div class="col-md-3 col-sm-6 col-12 mb-5">
      <div class="info-box">
        <span class="info-box-icon bg-info"><i class="far fa-copy"></i></span>
        <div class="info-box-content">
          <span class="info-box-text">Dokumen Pleno</span>
          <span class="info-box-number">{{ data.dokumen }}</span>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-sm-6 col-12">
      <div class="info-box">
        <span class="info-box-icon bg-success"
          ><i class="far fa-user"></i
        ></span>
        <div class="info-box-content">
          <span class="info-box-text">User</span>
          <span class="info-box-number">{{ data.user }}</span>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-sm-6 col-12">
      <div class="info-box">
        <span class="info-box-icon bg-warning"
          ><i class="far fa-newspaper"></i
        ></span>
        <div class="info-box-content">
          <span class="info-box-text">Berita</span>
          <span class="info-box-number">{{ data.berita }}</span>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-sm-6 col-12">
      <div class="info-box">
        <span class="info-box-icon bg-danger"
          ><i class="far fa-images"></i
        ></span>
        <div class="info-box-content">
          <span class="info-box-text">Galeri</span>
          <span class="info-box-number">{{ data.gallery }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <section class="col-lg-12 connectedSortable">
      <div class="card">
        <div class="card-body">
          <BarChart v-bind="barChartProps" />
        </div>
        <div class="card-footer clearfix"></div>
      </div>
    </section>
  </div>
</template>
