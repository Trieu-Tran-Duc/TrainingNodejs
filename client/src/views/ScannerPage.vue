<template>
  <div class="scanner-page">
    <h2>Scanner</h2>

    <div id="reader" class="scanner-box"></div>

    <v-alert
      v-if="scanResult"
      type="success"
      class="mt-4"
    >
      Result: {{ scanResult }}
    </v-alert>

    <v-btn
      color="error"
      class="mt-4"
      @click="stopScan"
    >
      Stop Scanner
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'

const scanResult = ref<string | null>(null)
let html5QrCode: Html5Qrcode

onMounted(() => {
  html5QrCode = new Html5Qrcode('reader')

  html5QrCode.start(
    { facingMode: 'environment' },
    {
      fps: 10,
      qrbox: 250,
    },
    (decodedText) => {
      scanResult.value = decodedText
      stopScan()
    },
    (error) => {
        console.warn(`QR Code no match: ${error}`)
    }
  )
})

const stopScan = async () => {
  if (html5QrCode?.isScanning) {
    await html5QrCode.stop()
  }
}

onBeforeUnmount(() => {
  stopScan()
})
</script>

<style scoped>
.scanner-page {
  max-width: 400px;
  margin: auto;
  text-align: center;
}

.scanner-box {
  width: 100%;
}
</style>
