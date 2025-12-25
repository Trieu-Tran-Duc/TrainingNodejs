<template>
  <div>
    <h2>Admin Page</h2>
    <p>Chỉ dành cho admin</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '../stores'

export default defineComponent({
  setup() {
    const authStore = useAuthStore()
    console.log('Is Admin:', authStore.isAdmin)
    return {
      authStore
    }
  }
})
</script>
