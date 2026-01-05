<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    permanent
    :rail="rail"
    class="custom-drawer"
  >
    <v-list-item>
      <template #prepend>
        <v-icon>mdi-apps</v-icon>
      </template>
      <span v-if="!rail">My App</span>
    </v-list-item>

    <template #append>
      <v-btn icon variant="text" @click="toggleRail">
        <v-icon>{{ rail ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon>
      </v-btn>
    </template>

    <v-divider />

    <v-list nav>
      <v-list-item
        v-for="item in filteredMenu"
        :key="item.to"
        :to="item.to"
        :title="item.title"
        :prepend-icon="item.icon"
        link
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../stores";
import { menuItems } from "../types/menu";


const authStore = useAuthStore();
authStore.loadUserFromStorage()
const props = defineProps({
  drawer: Boolean,
  rail: Boolean,
});

const emit = defineEmits(["update:drawer", "update:rail"]);

const drawer = ref(props.drawer);
const rail = ref(props.rail);

const toggleRail = () => {
  rail.value = !rail.value;
  emit("update:rail", rail.value); // đồng bộ với MainLayout
};

const filteredMenu = computed(() => {
  if (!authStore.getIsLoggedIn) return [];
  return menuItems.filter((item) =>
    item.roles.includes('admin')
  );
});
</script>

<style lang="scss" scoped>
.custom-drawer {
  &.v-navigation-drawer--open {
    width: 230px !important;
  }

  &.v-navigation-drawer--rail {
    width: 56px !important;
  }

  transition: width 0.3s ease;
}
</style>