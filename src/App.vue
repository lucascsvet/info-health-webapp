<script setup>
import { ref, onMounted } from 'vue'
import api from './api/client.js'

const apiStatus = ref({ loading: true, data: null, error: null })

onMounted(async () => {
  try {
    apiStatus.value.data = await api.get('/')
    apiStatus.value.error = null
  } catch (e) {
    apiStatus.value.error = e.message
    apiStatus.value.data = null
  } finally {
    apiStatus.value.loading = false
  }
})
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>Info Health</h1>
      <p class="tagline">Frontend da aplicação</p>
    </header>
    <main class="main">
      <div v-if="apiStatus.loading" class="status">Conectando à API…</div>
      <div v-else-if="apiStatus.error" class="status error">API indisponível: {{ apiStatus.error }}</div>
      <div v-else-if="apiStatus.data" class="status ok">
        API: {{ apiStatus.data.name }} — {{ apiStatus.data.message }}
      </div>
    </main>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 2rem;
}
.tagline {
  opacity: 0.8;
  font-size: 1rem;
}
.main {
  text-align: left;
}
.status {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: rgba(255,255,255,0.06);
}
.status.ok { background: rgba(0,200,100,0.15); color: #6ee7b7; }
.status.error { background: rgba(220,80,80,0.15); color: #fca5a5; }
</style>
