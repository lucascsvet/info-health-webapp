<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #6f42c1;">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center text-decoration-none text-white">
        <img src="/img/info-health.png" alt="Info Health" height="32" width="32" class="me-2">
        <span>Info Health</span>
      </router-link>
    </div>
  </nav>

  <div class="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow-sm border-0" style="max-width: 420px; width: 100%;">
      <div class="card-body p-5">
        <div class="text-center mb-4">
          <img src="/img/info-health.png" alt="Info Health" height="80" width="80" class="mb-3">
          <h4 class="fw-bold text-dark mb-1">Info Health</h4>
          <p class="text-muted small mb-4">Faça seu login para detalhes de sua conta.</p>
        </div>

        <div v-if="error" class="alert alert-danger py-2 mb-3 small">{{ error }}</div>

        <form @submit.prevent="submit">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email"
              placeholder="Digite seu email"
              required
              autocomplete="email"
            >
          </div>

          <div class="mb-4">
            <label for="password" class="form-label">Senha</label>
            <div class="input-group">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                id="password"
                placeholder="Digite sua senha"
                required
                autocomplete="current-password"
              >
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="toggleShowPassword"
                :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
              >
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100 py-2" :disabled="loading">
            {{ submitButtonText }}
          </button>
        </form>

        <p class="text-center text-muted small mt-4 mb-0">
          Não tem uma conta?
          <a href="#" class="text-primary text-decoration-underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/client.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      error: '',
      loading: false,
    }
  },
  computed: {
    submitButtonText() {
      return this.loading ? 'Entrando...' : 'Entrar'
    },
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },
    async submit() {
      this.error = ''
      this.loading = true
      try {
        const { user, token } = await api.post('/api/login', {
          email: this.email,
          password: this.password,
        })
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(user))
        this.$router.push('/')
      } catch (e) {
        const data = e.data || (() => {
          try { return JSON.parse(e.message) } catch { return null }
        })()
        this.error = data?.message || data?.errors?.email?.[0] || e.message || 'Erro ao fazer login.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
