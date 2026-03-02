<template>
  <AppNavbar auth />

  <div class="container py-5">
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <template v-else-if="user">
      <div class="text-center">
        <img src="/img/info-health.png" alt="Info Health" height="80" width="80" class="mb-3">
        <h4 class="fw-bold text-dark mb-4">QR CODE</h4>
        <p class="fw-bold mb-2">{{ user.full_name }}</p>
        <div class="mb-4">
          <img :src="qrCodeDataUrl" alt="QR Code" class="img-fluid" style="max-width: 240px;">
        </div>
        <p class="fw-bold text-muted">{{ user.public_password }}</p>
        <img src="/img/info-health.png" alt="Info Health" height="60" width="60" class="mt-3">
      </div>
    </template>
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue'
import api from '../api/client.js'
import QRCode from 'qrcode'

export default {
  components: { AppNavbar },
  data() {
    return {
      user: null,
      qrCodeDataUrl: '',
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
        localStorage.setItem('auth_public_login', this.user.is_public_login ? 'true' : '')
        await this.generateQrCode()
      } catch (e) {
        this.error = e.message
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        this.$router.push('/login')
      }
    },
    async generateQrCode() {
      if (!this.user?.id) return
      const url = `${window.location.origin}/acesso/${this.user.id}`
      this.qrCodeDataUrl = await QRCode.toDataURL(url, { width: 240, margin: 2 })
    },
  },
}
</script>
