<template>
  <v-container>
    <v-card>
      <v-card-title>Dashboard</v-card-title>
      <v-card-text>
        <p>Welcome to the Dashboard!</p>
        <p>{{selectedRadio}}</p>
      </v-card-text>
      <VRadioButton v-model="selectedRadio" :options="radioOptions" label="Select an option:" :inline=true>

      </VRadioButton>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { VRadioButton } from '../components'
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: { VRadioButton },
  setup() {

    const selectedRadio = ref<string | null>('one')
    const radioOptions = [
      { label: 'Radio One', value: 'one' },
      { label: 'Radio Two', value: 'two' },
      { label: 'Radio Three', value: 'three' },
    ];

    

    return {
      selectedRadio,
      radioOptions
    }
  }
});

</script>