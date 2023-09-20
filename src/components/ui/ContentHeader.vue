<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const pageTitle = computed(() => {
  const name = route.name;
  if (!name)
  {
    return ""; // Handle the case when route name is undefined
  }

  const title = name.replace(/([a-z])([A-Z])/g, "$1 $2");
  return title.charAt(0).toUpperCase() + title.slice(1);
})

const breadcrumbs = computed(() => {
  const routeMeta = route.meta.breadcrumb || [];

  // Generate the breadcrumb based on the route path
  const crumbs = routeMeta.map((breadcrumb) => {
    return {
      label: breadcrumb.label,
      route: {
        path: breadcrumb.path,
        query: route.query,
      },
    };
  });

  // Add the current route as the last breadcrumb
  crumbs.push({
    label: "Current Page",
    route: route,
  });

  return crumbs;
})

</script>

<template>
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <div class="d-flex align-items-center">
            <a v-if="breadcrumbs.length > 1" href="#" class="circle-avatar mr-3" @click.prevent="router.back">
              <i class="fas fa-angle-left"></i> Kembali
            </a>
            <h1 class="m-0">{{ pageTitle }}</h1>
          </div>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <router-link to="/">Home</router-link>
            </li>
            <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item"
              :class="{ active: index === breadcrumbs.length - 1 }">
              <router-link :to="crumb.route">{{ crumb.label }}</router-link>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>