const baseURL = import.meta.env.VITE_API_URL || ''

function getAuthHeaders() {
  const token = localStorage.getItem('auth_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${baseURL.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`
  const { headers: optHeaders, ...restOptions } = options
  const headers = { Accept: 'application/json', ...getAuthHeaders(), ...optHeaders }
  const res = await fetch(url, { headers, ...restOptions })
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

function jsonBody(body) {
  return {
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  }
}

export const api = {
  get(path, options = {}) {
    return request(path, { method: 'GET', ...options })
  },
  post(path, body, options = {}) {
    return request(path, { method: 'POST', ...jsonBody(body), ...options })
  },
  put(path, body, options = {}) {
    return request(path, { method: 'PUT', ...jsonBody(body), ...options })
  },
}

export default api
