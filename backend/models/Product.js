const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true }, // nombre del celular
  description: { type: String, default: '' }, // detalles
  price: { type: Number, required: true },
  image: { type: String, default: '' }, // URL de la imagen
  stock: { type: Number, default: 0 },
  brand: { type: String, default: 'genérica' }, // marca
  category: { type: String, default: 'celulares' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
