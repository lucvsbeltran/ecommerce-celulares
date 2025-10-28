// backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión a MongoDB:', err));

// Rutas principales
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});

// Importar y usar rutas
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/products', productRoutes);
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // si ya tenés la ruta del perfil

// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🌍 Servidor corriendo en puerto ${PORT}`));
