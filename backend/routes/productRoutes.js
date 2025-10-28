const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');

// Rutas de productos
router.get('/', productCtrl.getAll);
router.get('/:id', productCtrl.getOne);
router.post('/', productCtrl.create);
router.put('/:id', productCtrl.update);
router.delete('/:id', productCtrl.remove);

module.exports = router;
