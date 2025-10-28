const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authmiddleware'); // IMPORTANTE: desestructurado

// Ruta protegida: obtiene perfil del usuario
router.get('/profile', protect, getUserProfile);

module.exports = router;
