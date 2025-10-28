require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  { title: 'iPhone 15 Pro', description: 'Pantalla OLED 6.1", 128GB', price: 1199, stock: 10, brand: 'Apple', image: '', category: 'smartphone' },
  { title: 'Samsung Galaxy S24', description: '8GB RAM, 256GB', price: 999, stock: 8, brand: 'Samsung', image: '', category: 'smartphone' },
  { title: 'Xiaomi Redmi Note 13', description: 'Cámara 108MP', price: 399, stock: 15, brand: 'Xiaomi', image: '', category: 'smartphone' },
  { title: 'Motorola Edge 50', description: 'Batería 5000mAh', price: 499, stock: 12, brand: 'Motorola', image: '', category: 'smartphone' },
  { title: 'Huawei P60', description: 'Cámara Leica, 256GB', price: 899, stock: 6, brand: 'Huawei', image: '', category: 'smartphone' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB, limpiando productos...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('✅ Productos agregados con éxito');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
