<template>
  <v-navigation-drawer v-model="drawer" app permanent :rail="rail" class="custom-drawer">
    <v-list-item title="My App">
      <template #prepend>
        <v-icon>mdi-apps</v-icon>
      </template>
    </v-list-item>
    <template #append>
      <v-btn icon variant="text" @click="toggleRail">
        <v-icon>
          {{ rail ? "mdi-chevron-right" : "mdi-chevron-left" }}
        </v-icon>
      </v-btn>
    </template>
    <v-divider />

    <v-list nav>
      <v-list-item v-for="item in filteredMenu" :key="item.to" :to="item.to" :title="item.title"
        :prepend-icon="item.icon" link />

    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../stores";
import { menuItems } from "../types/menu";


const drawer = ref(true);
const rail = ref(false);
const authStore = useAuthStore();
authStore.loadUserFromStorage()

const toggleRail = () => {
  rail.value = !rail.value;
};

const filteredMenu = computed(() => {
  if (!authStore.getIsLoggedIn) return [];
  return menuItems.filter(item =>
    item.roles.includes('admin')
  );
});
</script>

<style lang="scss" scoped>
.custom-drawer {
  &.v-navigation-drawer{
    width: 230px !important;
  }

  &.v-navigation-drawer--open {
    width: 200px !important; 
  }

  &.v-navigation-drawer--rail {
    width: 56px !important; 
  }

  transition: width 0.3s ease;
}
</style>