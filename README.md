# Info Health – Frontend

Frontend Vue 3 + Vite do projeto Info Health, integrado à API **info-health-api**.

## Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Vue.js | 3.5 | Framework reativo |
| Vite | 7.3 | Build tool e dev server |
| Vue Router | 5.0 | Roteamento SPA |
| Bootstrap | 5.3 | UI e componentes |
| Bootstrap Icons | 1.13 | Ícones |
| QRCode.js | 1.5 | Geração de QR Code |
| vue-3-mask | 0.0.1-alpha | Máscaras de input (CPF, telefone) |

## Desenvolvimento local

**Pré-requisitos:** Node.js 18+, npm.

```bash
npm install
cp .env.example .env
npm run dev
```

Acesse `http://localhost:5173`. A URL da API é definida em `.env`:

- Crie `.env` a partir de `.env.example`.
- `VITE_API_URL=http://localhost:8000` (API rodando na máquina ou em Docker).

Com a API em `http://localhost:8000`, a página exibe o status da conexão.

## Docker (build individual do frontend)

Build e execução **somente do frontend**:

```bash
docker compose build
docker compose up
```

A imagem é gravada como `info-health-webapp:latest`. Frontend em `http://localhost:3000` (API em `http://localhost:8000`).

1. **Construir o frontend** (uma vez, ou quando mudar o webapp):

   ```bash
   cd info-health-webapp
   docker compose build
   ```

2. **Subir a stack** (API + frontend):

   ```bash
   cd info-health-api
   docker compose up
   ```

- API: `http://localhost:8000`
- Frontend: `http://localhost:3000`

## Deploy no Render.com

1. Crie um **Static Site** e conecte o repositório do **info-health-webapp**.
2. **Build Command:** `npm install && npm run build`
3. **Publish Directory:** `dist`
4. **Variável de ambiente (obrigatória):** `VITE_API_URL` = URL pública da API no Render (ex: `https://info-health-api.onrender.com`).  
   Deploy a API primeiro, copie a URL e use aqui (o valor é injetado em tempo de build).
5. Após o deploy, informe na API a URL do frontend (variável `FRONTEND_URL`) para CORS.

Veja também `render.yaml` neste repositório.

## Integração com a API

- Cliente de API em `src/api/client.js` (usa `VITE_API_URL`).
- Em desenvolvimento, o Vite pode fazer proxy de `/api` para a API (ver `vite.config.js`).
- A API **info-health-api** está com CORS configurado em `config/cors.php` para aceitar requisições do frontend.
