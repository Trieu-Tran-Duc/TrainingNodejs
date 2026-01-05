import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true }, 
      manifest: {
        name: "Vue Barcode Scanner",
        short_name: "BarcodeScan",
        description: "Scan barcode offline-first",
        theme_color: "#4DBA87",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "../public/hehe.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "../public/hihi.jpg",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/api\/.*\/*.json/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60 
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: `@import "@/assets/styles/color.scss";`
  //       }
  //     },
  //   },
})
