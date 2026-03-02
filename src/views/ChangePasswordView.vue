<template>
  <AppNavbar auth />

  <div class="container py-5">
    <div class="text-center mb-4">
      <img src="/img/info-health.png" alt="Info Health" height="80" width="80" class="mb-3">
      <h4 class="fw-bold text-dark mb-1">Trocar senha</h4>
      <p class="text-muted">Altere sua senha de acesso</p>
    </div>

    <div v-if="error" class="alert alert-danger mx-auto" style="max-width: 420px;">{{ error }}</div>
    <div v-if="success" class="alert alert-success mx-auto" style="max-width: 420px;">{{ success }}</div>

    <form @submit.prevent="submit" class="mx-auto" style="max-width: 420px;">
      <div class="mb-3">
        <label for="current_password" class="form-label">Senha atual *</label>
        <div class="input-group">
          <input
            v-model="form.current_password"
            :type="showCurrentPassword ? 'text' : 'password'"
            class="form-control"
            id="current_password"
            placeholder="Digite sua senha atual"
            required
            autocomplete="current-password"
          >
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="showCurrentPassword = !showCurrentPassword"
            :aria-label="showCurrentPassword ? 'Ocultar senha' : 'Mostrar senha'"
          >
            <i :class="showCurrentPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
        </div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Nova senha *</label>
        <div class="input-group">
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            id="password"
            placeholder="Digite a nova senha (mínimo 6 caracteres)"
            required
            minlength="6"
            autocomplete="new-password"
          >
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="showPassword = !showPassword"
            :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
          >
            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
        </div>
      </div>

      <div class="mb-4">
        <label for="password_confirmation" class="form-label">Confirmação da nova senha *</label>
        <div class="input-group">
          <input
            v-model="form.password_confirmation"
            :type="showPasswordConfirm ? 'text' : 'password'"
            class="form-control"
            id="password_confirmation"
            placeholder="Digite novamente a nova senha"
            required
            minlength="6"
            autocomplete="new-password"
          >
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="showPasswordConfirm = !showPasswordConfirm"
            :aria-label="showPasswordConfirm ? 'Ocultar senha' : 'Mostrar senha'"
          >
            <i :class="showPasswordConfirm ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
        </div>
      </div>

      <div class="d-flex flex-column gap-2">
        <button type="submit" class="btn btn-primary py-2" :disabled="loading">
          {{ loading ? 'Alterando...' : 'Alterar senha' }}
        </button>
        <router-link to="/" class="btn btn-secondary py-2">Voltar</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue'
import api from '../api/client.js'

export default {
  components: { AppNavbar },
  data() {
    return {
      form: {
        current_password: '',
        password: '',
        password_confirmation: '',
      },
      showCurrentPassword: false,
      showPassword: false,
      showPasswordConfirm: false,
      error: '',
      success: '',
      loading: false,
    }
  },
  methods: {
    async submit() {
      this.error = ''
      this.success = ''
      this.loading = true
      try {
        await api.put('/api/user/password', this.form)
        this.success = 'Senha alterada com sucesso.'
        this.form = { current_password: '', password: '', password_confirmation: '' }
      } catch (e) {
        const data = e.data || (() => {
          try { return JSON.parse(e.message) } catch { return null }
        })()
        const errs = data?.errors
        if (errs) {
          const first = Object.values(errs).flat()[0]
          this.error = first || data?.message || 'Erro ao alterar senha.'
        } else {
          this.error = data?.message || e.message || 'Erro ao alterar senha.'
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
