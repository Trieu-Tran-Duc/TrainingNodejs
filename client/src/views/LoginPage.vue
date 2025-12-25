<template>
  <v-container class="login-container fill-height d-flex align-center justify-center">
    <v-card class="login-card" width="400">
      <v-card-title class="justify-center">
        <span class="login-title">Welcome back!</span>
        <span class="login-sub-title ml-2">Please login to your account</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="loginForm">
      <VTextField 
        v-model="username" 
        label="User Name" 
        placeholder="input username" 
        required :rules="[minLengthRule, noSpacesRule]" 
      />

      <VTextField 
        v-model="password" 
        label="Password" 
        type="password" 
        required :rules="[minLengthRule]" 
      />

      <VButton 
        label="Login"
        color="primary"
        size="large"
        icon="mdi-content-save"
        @click="login"
        class="mt-4 justify-center"
      />
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { VTextField, VButton } from '../components'
import { useAuthStore, useLoadingStore } from '../stores'

export default defineComponent({
  components: { VTextField, VButton },
  setup() {
    const password = ref('')
    const username = ref('')
    
    const authStore = useAuthStore()
    const loadingStore = useLoadingStore()

    loadingStore.showLoading()
    const minLengthRule = (value: string | number) =>
      (String(value).length >= 5) || 'Username must be at least 5 characters'

    const noSpacesRule = (value: string | number) =>
      (!/\s/.test(String(value))) || 'Username cannot contain spaces'

    const login = () => {
      authStore.login({ username: username.value, password: password.value })
    }
    loadingStore.hideLoading()
    return { 
      username, 
      password, 
      minLengthRule, 
      noSpacesRule, 
      login 
    }
  }
})
</script>

<style lang="scss" scoped>

.login-container {
  padding: 0 16px;
}

.login-card {
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 12px 24px var(--medium_gray);
}

.login-title,
.login-sub-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--dark_gray);

  display: flex;          
  justify-content: center; 
  align-items: center;    
  width: 100%;           
  text-align: center;  
}
.login-sub-title{
  font-size: 1rem;
  font-weight: 400;
  color: var(--medium_gray);
}

.v-text-field input {
  border-radius: 8px !important;
}

</style>