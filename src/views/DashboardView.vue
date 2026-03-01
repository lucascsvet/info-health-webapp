<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #6f42c1;">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center text-decoration-none text-white">
        <img src="/img/info-health.png" alt="Info Health" height="32" width="32" class="me-2">
        <span>Info Health</span>
      </router-link>
      <div class="navbar-nav ms-auto">
        <button type="button" class="btn btn-outline-light btn-sm" @click="logout" title="Sair"><i class="bi bi-box-arrow-right"></i></button>
      </div>
    </div>
  </nav>

  <div class="container py-5">
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else-if="user" class="alert alert-success">
      <h5 class="alert-heading">Bem-vindo, {{ userName }}!</h5>
      <p class="mb-0">Você está logado no Info Health.</p>
    </div>
  </div>
</template>

<script>
import api from '../api/client.js'

export default {
  data() {
    return {
      user: null,
      error: null,
    }
  },
  computed: {
    userName() {
      return this.user?.first_name || this.user?.email || 'Usuário'
    },
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try {
        this.user = await api.get('/api/user')
      } catch (e) {
        this.error = e.message
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        this.$router.push('/login')
      }
    },
    async logout() {
      try {
        await api.post('/api/logout')
      } catch (_) {}
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      this.$router.push('/login')
    },
  },
}
</script>
