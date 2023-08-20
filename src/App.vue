<script setup>
import Cookies from "js-cookies";
import { provide, shallowRef } from 'vue';
import router from './routes'
import layouts from './layout'

function token() {
  return Cookies.getItem("token") ?? "token";
}

const layout = shallowRef('div')

router.afterEach((to) => {
  layout.value = layouts[to.meta.layout] || 'div'
})


provide("app:layout", layout)

</script>

<template>
  <div>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>
<style>
</style>

