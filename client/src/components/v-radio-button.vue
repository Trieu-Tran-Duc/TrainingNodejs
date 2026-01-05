<template>
  <v-radio-group
    v-model="modelValueProxy"
    :inline="inline"
    :label="label"
  >
    <v-radio
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </v-radio-group>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface RadioOption {
  label: string;
  value: string | number;
}

const props = defineProps<{
  modelValue: string | number | null;
  options: RadioOption[];
  label?: string;
  inline?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void;
}>();

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>