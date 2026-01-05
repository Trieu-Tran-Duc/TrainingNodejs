<template>
  <v-app>
    <SideMenu v-if="auth.isLoggedIn" />

    <v-main :style="mainStyle">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import SideMenu from "../components/SideMenu.vue";
import { useAuthStore } from "../stores";
import { computed, ref } from "vue";

const rail = ref(false);
const drawer = ref(true);
const auth = useAuthStore();

const mainStyle = computed(() => ({
  //marginLeft: drawer.value ? (rail.value ? "36px" : "20px") : "0px",
  transition: "margin-left 0.3s ease",
}));

</script>
