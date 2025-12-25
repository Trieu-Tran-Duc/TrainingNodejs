<template>
  <v-app>
    <v-main> 
      <LoadingPage :visible="loadingStore.isLoading" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LoadingPage from '../src/views/LoadingPage.vue'
  import { useLoadingStore, useAuthStore } from '../src/stores'

  export default defineComponent({
    components: { LoadingPage },
    setup() {
      const loadingStore = useLoadingStore()
      const authStore = useAuthStore()
      authStore.loadUserFromStorage()
      return {
        loadingStore
      }
    }
  })
</script>