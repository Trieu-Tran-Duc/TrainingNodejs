<template>
    <div>
        <h2>Barcode Scanner</h2>

        <div :style="{ color: isOnline ? 'green' : 'red', marginBottom: '10px' }">
            Server status: {{ isOnline ? 'Online ✅' : 'Offline ❌' }}
        </div>

        <button @click="startScan" :disabled="scanning">
            {{ scanning ? 'Scanning...' : 'Start Scan' }}
        </button>

        <div v-show="scanning" id="reader" style="width: 300px; height: 300px; margin-top: 10px;"></div>

        <div v-if="lastScan" style="margin-top: 10px;">
            Last scanned QR: {{ lastScan }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { Html5Qrcode } from "html5-qrcode";
import { handleScan, syncPendingScans } from "../services";

export default defineComponent({
  setup() {
    const scanning = ref(false);
    const isOnline = ref(navigator.onLine);
    const lastScan = ref<string | null>(null);
    let qr: Html5Qrcode | null = null;

    function updateNetwork() {
      isOnline.value = navigator.onLine;
      if (isOnline.value) {
        syncPendingScans();
      }
    }

    async function startScan() {
      if (scanning.value) return;
      scanning.value = true;

      qr = new Html5Qrcode("reader");

      await qr.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (text) => {
          lastScan.value = text;
          await handleScan(text);
        },
        () => {}
      );
    }

    onMounted(() => {
      window.addEventListener("online", updateNetwork);
      window.addEventListener("offline", updateNetwork);
      syncPendingScans();
    });

    onUnmounted(() => {
      qr?.stop();
      window.removeEventListener("online", updateNetwork);
      window.removeEventListener("offline", updateNetwork);
    });

    return { scanning, isOnline, lastScan, startScan };
  }
});
</script>

<style scoped>
button {
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
}
</style>
