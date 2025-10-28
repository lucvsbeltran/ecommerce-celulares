// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');

// Ruta para registrar un usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', authUser);

module.exports = router;
