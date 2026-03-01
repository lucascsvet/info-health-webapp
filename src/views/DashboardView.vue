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
    <template v-else-if="user">
      <div class="text-center mb-4">
        <img src="/img/info-health.png" alt="Info Health" height="80" width="80" class="mb-3">
        <h4 class="fw-bold text-dark mb-0">Bem-vindo, {{ user.full_name }}!</h4>
      </div>

      <div class="row g-4 mx-auto" style="max-width: 900px;">
        <div class="col-md-6">
          <h6 class="text-muted mb-3">Informações do Usuário</h6>
          <div class="border rounded p-3 bg-light">
            <div class="d-flex justify-content-between py-2 border-bottom">
              <span class="text-muted">Nome</span>
              <span class="fw-medium">{{ user.full_name }}</span>
            </div>
            <div class="d-flex justify-content-between py-2 border-bottom">
              <span class="text-muted">CPF</span>
              <span class="fw-medium">{{ user.cpf || '—' }}</span>
            </div>
            <div class="d-flex justify-content-between py-2 border-bottom">
              <span class="text-muted">Email</span>
              <span class="fw-medium text-break">{{ user.email }}</span>
            </div>
            <div class="d-flex justify-content-between py-2 border-bottom">
              <span class="text-muted">Telefone</span>
              <span class="fw-medium">{{ user.phone || '—' }}</span>
            </div>
            <div class="d-flex justify-content-between py-2">
              <span class="text-muted">Senha Pública</span>
              <span class="fw-medium">{{ user.public_password || '—' }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h6 class="text-muted mb-3">Informações de Saúde</h6>
          <div class="border rounded p-3 bg-light">
            <div class="d-flex justify-content-between py-2 border-bottom">
              <span class="text-muted">Gênero</span>
              <span class="fw-medium">{{ user.clinical_data?.gender_description || 'Não informado' }}</span>
            </div>
            <div class="d-flex justify-content-between py-2 border-bottom">
              <span class="text-muted">Tipo Sanguíneo</span>
              <span class="fw-medium">{{ user.clinical_data?.blood_type_description || 'Não informado' }}</span>
            </div>
            <div class="d-flex justify-content-between py-2 border-bottom">
              <span class="text-muted">Alergias</span>
              <span class="fw-medium">{{ user.clinical_data?.allergies || 'Não informado' }}</span>
            </div>
            <div class="d-flex justify-content-between py-2 border-bottom">
              <span class="text-muted">Medicações</span>
              <span class="fw-medium">{{ user.clinical_data?.medications || 'Não informado' }}</span>
            </div>
            <div class="d-flex justify-content-between py-2 border-bottom">
              <span class="text-muted">Doenças</span>
              <span class="fw-medium">{{ user.clinical_data?.diseases || 'Não informado' }}</span>
            </div>
            <div class="d-flex justify-content-between py-2 border-bottom">
              <span class="text-muted">Nome do Contato de Emergência</span>
              <span class="fw-medium">{{ user.clinical_data?.emergency_contact_name || 'Não informado' }}</span>
            </div>
            <div class="d-flex justify-content-between py-2">
              <span class="text-muted">Telefone do Contato de Emergência</span>
              <span class="fw-medium">{{ user.clinical_data?.emergency_contact_phone || 'Não informado' }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
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
