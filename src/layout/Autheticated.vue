
<script setup>
import NavbarComponent from "../components/NavbarComponent.vue";
import SidebarComponent from "../components/SidebarComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import ContentHeader from "../components/ui/ContentHeader.vue";
import { onMounted } from "vue";
import { Vue3Snackbar } from "vue3-snackbar";

onMounted(() => {
    
})
</script>

<template>
    <div class="wrapper">
        <NavbarComponent />
        <SidebarComponent />
        <div class="content-wrapper">
            <content-header />
            <section class="content">
                <div class="container-fluid">
                    <slot />
                </div>
            </section>
        </div>
        <FooterComponent />
        <Vue3Snackbar bottom right :duration="10000"></Vue3Snackbar>
    </div>
</template>