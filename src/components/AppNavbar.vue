<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #6f42c1;">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center text-decoration-none text-white">
        <img src="/img/info-health.png" alt="Info Health" height="32" width="32" class="me-2">
        <span>Info Health</span>
      </router-link>
      <div v-if="auth && !isPublicLogin" class="navbar-nav ms-3 d-flex gap-2">
        <router-link to="/qr-code" class="nav-link text-white">Gerar QR Code</router-link>
        <router-link to="/editar-dados" class="nav-link text-white">Editar Dados</router-link>
      </div>
      <div v-if="auth" class="navbar-nav ms-auto">
        <button type="button" class="btn btn-outline-light btn-sm" @click="logout" title="Sair"><i class="bi bi-box-arrow-right"></i></button>
      </div>
    </div>
  </nav>
</template>

<script>
import api from '../api/client.js'

export default {
  props: {
    auth: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isPublicLogin() {
      return localStorage.getItem('auth_public_login') === 'true'
    },
  },
  methods: {
    async logout() {
      try {
        await api.post('/api/logout')
      } catch (_) {}
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_public_login')
      this.$router.push('/login')
    },
  },
}
</script>
