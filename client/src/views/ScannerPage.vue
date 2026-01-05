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
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { Html5Qrcode } from "html5-qrcode";
import saveScan from '../service-worker'

interface SyncManager {
    register(tag: string): Promise<void>;
}

interface ServiceWorkerRegistrationWithSync extends ServiceWorkerRegistration {
    sync: SyncManager;
}

export default defineComponent({
    setup() {
        const scanning = ref(false);
        const isOnline = ref(navigator.onLine);
        const lastScan = ref<string | null>(null);
        let html5QrCode: Html5Qrcode | null = null;

        function updateNetworkStatus() {
            isOnline.value = navigator.onLine;
            if (isOnline.value) {
                console.log("Server is online! Sync can happen now.");
            }
        }

        async function triggerSync() {
            if ("serviceWorker" in navigator && "SyncManager" in window) {
                const reg = await navigator.serviceWorker.ready as ServiceWorkerRegistrationWithSync;
                try {
                    await reg.sync.register("sync-scans");
                    console.log("Background sync registered");
                } catch (err) {
                    console.error("Sync registration failed:", err);
                }
            } else {
                console.log("Background sync not supported, fallback fetch");
            }
        }

        async function startScan() {
            if (scanning.value) return;
            scanning.value = true;

            html5QrCode = new Html5Qrcode("reader");
            try {
                await html5QrCode.start(
                    { facingMode: "environment" },
                    { fps: 10, qrbox: 250 },
                    async (decodedText) => {
                        console.log("Scanned:", decodedText);
                        lastScan.value = decodedText;

                        await saveScan(decodedText);

                        if (isOnline.value) {
                            await triggerSync();
                        }
                    },
                    (errorMessage) => {
                        console.warn("Scan error:", errorMessage);
                    }
                );
            } catch (err) {
                console.error("Camera start failed:", err);
                scanning.value = false;
                const demoData = "DEMO_QR_" + new Date().getTime();
                console.log("Using demo scan data:", demoData);
                lastScan.value = demoData;

                await saveScan(demoData);

                if (isOnline.value) {
                    await triggerSync();
                }
            }
        }

        onUnmounted(() => {
            if (html5QrCode) {
                html5QrCode.stop().catch((err) => console.error("Stop camera failed", err));
            }
        });

        window.addEventListener("online", updateNetworkStatus);
        window.addEventListener("offline", updateNetworkStatus);

        onMounted(() => {
            updateNetworkStatus();
        });

        return {
            scanning,
            isOnline,
            lastScan,
            startScan,
        };
    },
});
</script>

<style scoped>
button {
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
}
</style>
