<template>
  <div>
    <h2>Admin Page</h2>
    <p>hello {{ messageInfo }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useAuthStore, useAdminStore, useLoadingStore } from '../stores'

export default defineComponent({
  setup() {
    const messageInfo = ref('')
    const authStore = useAuthStore()
    const loadingStore = useLoadingStore()
    const adminStore = useAdminStore()

    loadingStore.showLoading()
   
     const fetchAdminInfo = async () => {
      loadingStore.showLoading()

      try {
        const response = await adminStore.getAdminInformation()
        messageInfo.value = response.message
      }  finally {
        loadingStore.hideLoading()
      }
    }

    onMounted( async () => {
      await fetchAdminInfo()
    })

    loadingStore.hideLoading()

   
    return {
      authStore,
      messageInfo
    }
  }
})
</script>
