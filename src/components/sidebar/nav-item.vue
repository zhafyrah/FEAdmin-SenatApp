<script setup>
import { computed, useSlots, onMounted } from 'vue';

const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    default: null,
  },
  to: {
    type: [String, Object],
    default: ''
  },
  customClass: {
    type: Object,
    default: {}
  }
})

const slots = useSlots()
const emit = defineEmits(['item-click'])

const hasChildren = computed(() => {
  return slots.dropdown && slots.dropdown().length > 0;
})

const is = computed(() => {
  if (props.to !== '#')
  {
    return 'router-link'
  }

  return 'a'
})

function handleItemClick(event) {
  emit("item-click");
}

</script>
<template>
  <li class="nav-item">
    <!-- :class="{ 'menu menu-is-opening menu-open': isOpenDropdown }" -->
    <component :is="is" :to="to" class="nav-link" @click.prevent="handleItemClick" :class="customClass">
      <p>
        <i :class="iconClass + ' mr-1'"></i>
        {{ text }}
        <span v-if="badge" class="badge badge-info right">{{ badge }}</span>
        <slot name="right"></slot>
        <i v-if="hasChildren" class="right fas fa-angle-right"></i>
      </p>
    </component>
    <ul v-if="hasChildren" class="nav nav-treeview">
      <slot name="dropdown" />
    </ul>
  </li>
</template>
