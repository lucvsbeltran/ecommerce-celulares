// Obtener perfil del usuario autenticado
const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // viene del middleware protect
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
};

module.exports = { getUserProfile };
