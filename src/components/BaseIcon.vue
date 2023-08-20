<script setup>
import { computed } from 'vue';

const props = defineProps({
    path: {
        type: String,
        required: true
    },
    w: {
        type: String,
        default: 'w-5'
    },
    h: {
        type: String,
        default: 'h-5'
    },
    color: {
        type: String,
        default: 'white'
    },
    size: {
        type: [String, Number],
        default: 16
    },
    border: {
        type: String,
        default: ''
    }
})

const spanClass = computed(() => `d-inline-flex justify-content-center align-items-center ${props.w} ${props.h} ${props.border}`)
</script>
<template>
    <span :class="spanClass">
        <svg viewBox="0 0 25 25" :width="size" :height="size" class="d-inline">
            <path :fill="color" :d="path" />
        </svg>
    </span>
</template>