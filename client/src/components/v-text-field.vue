<template>
  <v-card-text>
    <v-text-field 
      v-model="internalValue" 
      :label="label" 
      :type="type" 
      :placeholder="placeholder" 
      :error="hasError"
      :error-messages="errorMessages" 
      :outlined="outlined" 
      :rules="rules"
      :style="{ width: width, height: height }"
      class="custom-input"
      @input="$emit('update:modelValue', internalValue)" />
  </v-card-text>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  outlined: {
    type: Boolean,
    default: true
  },
  rules: {
    type: Array,
    default: () => []
  },
  width: { type: String, default: '100%' },
  height: { type: String, default: '56px' }
})

const emit = defineEmits(['update:modelValue'])
const internalValue = ref(props.modelValue)
const errorMessages = ref<string | string[]>('')

watch(
  () => props.modelValue,
  (val) => {
    if (val !== internalValue.value) {
      internalValue.value = val
    }
  }
)

watch(internalValue, (val) => {
  
  if (val !== props.modelValue) {
    emit('update:modelValue', val)
    for (const rule of props.rules) {
      if (typeof rule === 'function') {
        const result = rule(val)
        if (result !== true) {
          errorMessages.value = result as string
          return
        }
      }
  }
  errorMessages.value = ''
  }
})

const hasError = computed(() => !!errorMessages.value)
</script>

<style lang="scss" scoped>

 .custom-input {
 
  :deep(.v-input__control) {
    border-color: var(--deep_navy);
    background-color: var(--pale_blue);
    border-radius: 0.5rem;
    color: var(--deep_navy);
  }

  :deep(.v-messages__message) {
    color: var(--pastel_pink);
    font-size: 0.875rem;
  }

  :deep(.v-input:hover .v-input__control) {
    border-color: var(--dark_blue);
  }
}
</style>
