const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrae el token
      token = req.headers.authorization.split(' ')[1];

      // Verifica el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busca el usuario en la DB (sin contraseña)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Token no válido' });
    }
  } else {
    res.status(401).json({ message: 'No hay token, acceso denegado' });
  }
};

module.exports = { protect };
