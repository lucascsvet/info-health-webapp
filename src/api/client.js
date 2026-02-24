const baseURL = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${baseURL.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`
  const res = await fetch(url, {
    headers: { Accept: 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText))
  const contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) return res.json()
  return res.text()
}

export const api = {
  get(path) {
    return request(path, { method: 'GET' })
  },
  post(path, body) {
    return request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
  },
}

export default api
