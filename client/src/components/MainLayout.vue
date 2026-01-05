<template>
  <v-app>
     <SideMenu
      v-if="auth.isLoggedIn"
      v-model:drawer="drawer"
      v-model:rail="rail"
    />

    <v-main :style="mainStyle">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import SideMenu from "../components/SideMenu.vue";
import { useAuthStore } from "../stores";
import { ref, computed } from "vue";
const drawer = ref(true);
const rail = ref(false);
const auth = useAuthStore();

const mainStyle = computed(() => ({
     marginLeft: drawer.value ? (rail.value ? "56px" : "230px") : "0px",
  transition: "margin-left 0.3s ease",
}));

</script>
