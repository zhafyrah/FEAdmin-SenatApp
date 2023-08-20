<script setup>
import { computed } from 'vue';

const props = defineProps({
    page: {
        type: Number,
        default: 1
    },
    totalPage: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['click-prev', 'click-next', 'click-paginate'])

const disabledNext = computed(() => props.page >= props.totalPage)
const disabledPrev = computed(() => props.page === 1)

function onClickPrev(e) {
    e.preventDefault()
    emit('click-prev')
}

function onCLickNext(e) {
    e.preventDefault()
    emit('click-next')
}

function onClickPaginate(e) {
    e.preventDefault()
    emit('click-paginate', parseInt(e.target.text))
}

</script>
<template>
    <div class="row p-3">
        <div class="col-sm-12 col-md-12">
            <div class="d-flex align-items-center justify-content-center">
                <div class="dataTables_paginate_numbers">
                    <ul class="pagination">
                        <li class="paginate_button page-item previous" :class="{ 'disabled': disabledPrev }">
                            <a href="#" class="page-link" @click.prevent="onClickPrev">
                                Previous
                            </a>
                        </li>
                        <li class="paginate_button page-item" v-for="index in props.totalPage" :key="index"
                            :class="{ 'active': index === props.page }">
                            <a href="#" aria-controls="example" tabindex="0" class="page-link"
                                @click.prevent="onClickPaginate"> {{
                                    index }} </a>
                        </li>
                        <li class="paginate_button page-item next" :class="{ 'disabled': disabledNext }">
                            <a href="#" aria-controls="example" tabindex="0" class="page-link" @click.prevent="onCLickNext">
                                Next
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>