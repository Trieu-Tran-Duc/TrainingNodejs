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
      <VButton :prepend-icon="rail ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'" @click="toggleRail" class="custom-toggle">
</VButton>
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
import { VButton } from '../components'


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
  emit("update:rail", rail.value);
};

const filteredMenu = computed(() => {
  if (!authStore.getIsLoggedIn) return [];
  return menuItems.filter((item) =>
    item.roles.includes(authStore.role)
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
.custom-toggle {
  border: 1px solid var(--white) !important;
  border-radius: 0px;
  font-weight: 600;
  height: 40px !important;
  text-transform: uppercase;
  transition: width 0.3s ease;
  color: var(--dark_gray) !important;
}
</style>