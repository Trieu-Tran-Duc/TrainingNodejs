<template>
  <v-btn
    :color="color"
    :variant="variant"
    :size="size"
    :disabled="disabled || loading"
    :loading="loading"
    :prepend-icon="iconPosition === 'before' ? icon : undefined"
    @click="$emit('click')"
    class="base-button"
  >
    <slot>{{ label }}</slot>
  </v-btn>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  label: { type: String as PropType<string>, default: '' },
  color: { type: String as PropType<string>, default: 'primary' },
  variant: { type: String as PropType<'elevated' | 'flat' | 'outlined' | 'text' | 'tonal' | 'plain'>, default: 'tonal' },
  size: { type: String as PropType<'small' | 'medium' | 'large'>, default: 'medium' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },

  icon: { type: String, default: '' },
  iconPosition: {
    type: String as PropType<'before' | 'after'>,
    default: 'before'
  }
})

defineEmits<{
  (e: 'click'): void
}>()

</script>


<style lang="scss" scoped>
        .base-button {
        border: 1px solid var(--dark_gray) !important;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
  
        border-radius: 8px;
        font-weight: 600;
        text-transform: uppercase;
        border: 1px solid transparent;

        transition: transform 0.3s ease, box-shadow 0.3s ease;
        transform-origin: center; 
        color: var(--deep_navy) !important;
    }

    .base-button:hover {
        transform: scale(1.03);
    }

</style>
