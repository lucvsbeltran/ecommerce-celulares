# Ecommerce de Celulares

Proyecto completo de ecommerce de celulares construido con:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB
- **Autenticación:** JWT
- **Carrito de compras:** Context API
- **Pagos:** Stripe (modo prueba)

---

## Características

- Registro/Login de usuarios con JWT.
- Perfil de usuario protegido.
- Listado de productos (celulares) con carrito funcional.
- Agregar, eliminar y limpiar productos del carrito.
- Integración con Stripe para pagos de prueba.
- Configuración segura con `.env` y `.env.example`.

---

## Requisitos

- Node.js v18 o superior
- NPM
- Cuenta de MongoDB Atlas
- Claves de Stripe en modo prueba:
  - **Publishable Key:** para frontend
  - **Secret Key:** para backend

---

## Instalación

### Backend

1. Entrar a la carpeta backend:

```bash
cd backend
Instalar dependencias:

bash
Copiar código
npm install
Crear archivo .env copiando el ejemplo:

bash
Copiar código
copy .env.example .env
Reemplazar valores:

ini
Copiar código
MONGO_URI=<tu URI de MongoDB>
JWT_SECRET=<tu clave secreta>
PORT=4000
STRIPE_SECRET_KEY=<tu clave secreta Stripe>
Iniciar el servidor:

bash
Copiar código
npm run dev
✅ Deberías ver:

css
Copiar código
Servidor corriendo en puerto 4000
Conectado a MongoDB
Frontend
Entrar a la carpeta frontend:

bash
Copiar código
cd frontend
Instalar dependencias:

bash
Copiar código
npm install
Abrir src/pages/Cart.jsx y reemplazar tu Publishable Key de Stripe:

javascript
Copiar código
const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXX");
Iniciar el frontend:

bash
Copiar código
npm run dev
✅ Deberías ver la app corriendo en http://localhost:5173 (Vite).

Uso de Stripe en modo prueba
Crear un carrito de prueba desde PowerShell:

powershell
Copiar código
Invoke-RestMethod -Method Post -Uri http://localhost:4000/api/orders/create-payment-intent -Body (ConvertTo-Json @{
  items = @(
    @{ _id = "1"; title = "iPhone 15 Pro"; price = 1199; qty = 1 },
    @{ _id = "2"; title = "Xiaomi Redmi Note 13"; price = 399; qty = 2 }
  )
}) -ContentType "application/json"
La respuesta debe incluir clientSecret, usado en frontend para procesar pagos de prueba.

Para probar pagos en frontend, usar tarjeta de prueba:

yaml
Copiar código
Número: 4242 4242 4242 4242
MM/AA: cualquier fecha futura
CVC: cualquier número
Estructura de carpetas
lua
Copiar código
ecommerce-celulares/
│
├─ backend/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ server.js
│  ├─ .env.example
│  └─ package.json
│
├─ frontend/
│  ├─ src/
│  │  ├─ pages/
│  │  ├─ context/
│  │  ├─ api/
│  │  └─ main.jsx
│  ├─ package.json
│  └─ vite.config.js
│
└─ .gitignore
Seguridad
No subir .env real a GitHub.

Incluir .env.example con variables de ejemplo:

makefile
Copiar código
MONGO_URI=
JWT_SECRET=
PORT=
STRIPE_SECRET_KEY=
.gitignore debe contener:

bash
Copiar código
node_modules/
.env
Ejecutar proyecto completo
Backend:

bash
Copiar código
cd backend
npm install
npm run dev
Frontend:

bash
Copiar código
cd frontend
npm install
npm run dev
Créditos
Desarrollado por Lucas Beltrán como proyecto final de ecommerce.

