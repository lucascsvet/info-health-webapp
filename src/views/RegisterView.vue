<template>
  <AppNavbar :auth="isEdit" />

  <div class="container py-5">
    <div class="text-center mb-4">
      <img src="/img/info-health.png" alt="Info Health" height="80" width="80" class="mb-3">
      <h4 class="fw-bold text-dark mb-1">{{ title }}</h4>
      <p class="text-muted">Fique mais seguro!</p>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <form v-if="form" @submit.prevent="submit" class="mx-auto" style="max-width: 600px;">
      <h6 class="text-muted mb-3">Informações pessoais</h6>
      <div class="row g-3 mb-4">
        <div class="col-md-6">
          <label class="form-label">Nome *</label>
          <input v-model="form.first_name" type="text" class="form-control" placeholder="Digite seu nome" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">Sobrenome *</label>
          <input v-model="form.last_name" type="text" class="form-control" placeholder="Digite seu sobrenome" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">CPF *</label>
          <MaskInput v-model="form.cpf" :value="form.cpf" mask="###.###.###-##" class="form-control" placeholder="Digite seu CPF" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Email *</label>
          <input v-model="form.email" type="email" class="form-control" placeholder="Digite seu email" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">Telefone *</label>
          <MaskInput v-model="form.phone" :value="form.phone" mask="(##) #####-####" class="form-control" placeholder="Digite seu telefone" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Gênero *</label>
          <div class="d-flex gap-3 pt-2">
            <div v-for="g in genders" :key="g.id" class="form-check">
              <input v-model="form.gender" type="radio" :value="g.id" :id="'gender-' + g.id" class="form-check-input">
              <label :for="'gender-' + g.id" class="form-check-label">{{ g.description }}</label>
            </div>
          </div>
        </div>
        <div class="col-12">
          <label class="form-label">Tipo Sanguíneo *</label>
          <select v-model="form.blood_type" class="form-select" required>
            <option value="">Selecione seu tipo sanguíneo</option>
            <option v-for="bt in bloodTypes" :key="bt.id" :value="bt.id">{{ bt.description }}</option>
          </select>
        </div>
      </div>

      <h6 class="text-muted mb-3">Contato de emergência</h6>
      <div class="row g-3 mb-4">
        <div class="col-md-6">
          <label class="form-label">Nome do Contato de Emergência *</label>
          <input v-model="form.emergency_contact_name" type="text" class="form-control" placeholder="Digite o nome do seu contato de emergência" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">Telefone do Contato de Emergência *</label>
          <MaskInput v-model="form.emergency_contact_phone" :value="form.emergency_contact_phone" mask="(##) #####-####" class="form-control" placeholder="Digite o telefone do seu contato de emergência" required />
        </div>
      </div>

      <h6 class="text-muted mb-3">Informações clínicas</h6>
      <div class="mb-4">
        <div class="mb-3">
          <label class="form-label">Alergias</label>
          <textarea v-model="form.allergies" class="form-control" rows="2" placeholder="Digite caso tenha uma alergia"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Medicações</label>
          <textarea v-model="form.medications" class="form-control" rows="2" placeholder="Digite caso faça uso de uma medicação"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Doenças</label>
          <textarea v-model="form.diseases" class="form-control" rows="2" placeholder="Digite caso tenha uma doença"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Cirurgias</label>
          <textarea v-model="form.surgeries" class="form-control" rows="2" placeholder="Digite caso tenha feito uma cirurgia"></textarea>
        </div>
      </div>

      <h6 class="text-muted mb-3">Segurança</h6>
      <div class="mb-4">
        <template v-if="!isEdit">
          <div class="mb-3">
            <label class="form-label">Senha *</label>
            <div class="input-group">
              <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Digite sua senha. Mínimo 6 caracteres" required minlength="6">
              <button type="button" class="btn btn-outline-secondary" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Confirmação de Senha *</label>
            <div class="input-group">
              <input v-model="form.password_confirmation" :type="showPasswordConfirm ? 'text' : 'password'" class="form-control" placeholder="Digite sua senha. Mínimo 6 caracteres" required minlength="6">
              <button type="button" class="btn btn-outline-secondary" @click="showPasswordConfirm = !showPasswordConfirm">
                <i :class="showPasswordConfirm ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>
        </template>
        <div class="mb-3">
          <label class="form-label">Senha de Acesso Público *</label>
          <div class="input-group">
            <input v-model="form.public_password" :type="showPublicPassword ? 'text' : 'password'" class="form-control" :placeholder="isEdit ? 'Mínimo 4 caracteres' : 'Digite sua senha. Mínimo 4 caracteres'" required minlength="4">
            <button type="button" class="btn btn-outline-secondary" @click="showPublicPassword = !showPublicPassword">
              <i :class="showPublicPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column gap-2">
        <button type="submit" class="btn btn-primary py-2" :disabled="loading">{{ submitButtonText }}</button>
        <router-link :to="isEdit ? '/' : '/login'" class="btn btn-secondary py-2">Voltar</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue'
import api from '../api/client.js'

const emptyForm = () => ({
  first_name: '',
  last_name: '',
  cpf: '',
  email: '',
  phone: '',
  gender: 1,
  blood_type: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  allergies: '',
  medications: '',
  diseases: '',
  surgeries: '',
  password: '',
  password_confirmation: '',
  public_password: '',
})

export default {
  components: { AppNavbar },
  data() {
    return {
      form: null,
      genders: [],
      bloodTypes: [],
      showPassword: false,
      showPasswordConfirm: false,
      showPublicPassword: false,
      error: '',
      loading: false,
    }
  },
  computed: {
    isEdit() {
      return this.$route.name === 'editar-dados'
    },
    title() {
      return this.isEdit ? 'Editar dados' : 'Crie sua conta de saúde'
    },
    submitButtonText() {
      if (this.loading) return this.isEdit ? 'Atualizando...' : 'Cadastrando...'
      return this.isEdit ? 'Atualizar' : 'Cadastrar'
    },
  },
  mounted() {
    this.fetchOptions()
    if (this.isEdit) {
      this.fetchUser()
    } else {
      this.form = emptyForm()
    }
  },
  methods: {
    async fetchOptions() {
      try {
        const [genders, bloodTypes] = await Promise.all([
          api.get('/api/genders'),
          api.get('/api/blood-types'),
        ])
        this.genders = genders
        this.bloodTypes = bloodTypes
      } catch (e) {
        this.error = 'Erro ao carregar opções. Tente novamente.'
      }
    },
    async fetchUser() {
      try {
        const user = await api.get('/api/user')
        const cd = user.clinical_data
        this.form = {
          ...emptyForm(),
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          cpf: user.cpf || '',
          email: user.email || '',
          phone: user.phone || '',
          gender: cd?.gender ?? 1,
          blood_type: cd?.blood_type.id ?? '',
          emergency_contact_name: cd?.emergency_contact_name || '',
          emergency_contact_phone: cd?.emergency_contact_phone || '',
          allergies: cd?.allergies || '',
          medications: cd?.medications || '',
          diseases: cd?.diseases || '',
          surgeries: cd?.surgeries || '',
          public_password: user.public_password || '',
        }
      } catch (e) {
        this.error = e.message
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        this.$router.push('/login')
      }
    },
    async submit() {
      this.error = ''
      this.loading = true
      try {
        if (this.isEdit) {
          const user = await api.put('/api/user', this.form)
          localStorage.setItem('auth_user', JSON.stringify(user))
          this.$router.push('/')
        } else {
          const payload = { ...this.form }
          const { user, token } = await api.post('/api/register', payload)
          localStorage.setItem('auth_token', token)
          localStorage.setItem('auth_user', JSON.stringify(user))
          localStorage.setItem('auth_public_login', '')
          this.$router.push('/')
        }
      } catch (e) {
        const data = e.data || (() => {
          try { return JSON.parse(e.message) } catch { return null }
        })()
        const errs = data?.errors
        const msg = this.isEdit ? 'Erro ao atualizar.' : 'Erro ao cadastrar.'
        if (errs) {
          const first = Object.values(errs).flat()[0]
          this.error = first || data?.message || msg
        } else {
          this.error = data?.message || e.message || msg
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
