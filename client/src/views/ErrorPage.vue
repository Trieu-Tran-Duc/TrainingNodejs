<template>
  <div class="error-page">
    <h2>An Error Occurred</h2>
    <p>{{ errotMessage }}</p>
    <button @click="goHome">Go Home</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    message: {
      type: String,
      default: 'Something went wrong'
    }
  },
  setup(props) {
    const router = useRouter()

    const goHome = () => {
      router.push('/login')
    }

    return {
      errotMessage: props.message,
      goHome
    }
  }
})
</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 50px;
}
</style>
