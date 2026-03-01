const baseURL = import.meta.env.VITE_API_URL || ''

function getAuthHeaders() {
  const token = localStorage.getItem('auth_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${baseURL.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`
  const res = await fetch(url, {
    headers: { Accept: 'application/json', ...getAuthHeaders(), ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    try {
      const json = JSON.parse(text)
      const err = new Error(json.message || text)
      err.data = json
      throw err
    } catch (e) {
      if (e.data) throw e
      throw new Error(text)
    }
  }
  const contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) return res.json()
  return res.text()
}

export const api = {
  get(path) {
    return request(path, { method: 'GET' })
  },
  post(path, body) {
    return request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
  },
}

export default api
