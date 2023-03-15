// Aquí estarán todas las 'routers' (peticiones) que se harán desde el Frontend 
// a la base de datos. (GET, POST, PUT, DELETE)
// Las definiciones de las funciones están en 'joyas.controller.js'

const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productos.controller');

router.get('/', productosController.getProductos);
router.post('/', productosController.createProducto);
router.get('/:id', productosController.getProductoID);
router.get('/verificar/:id', productosController.getVerificar);
router.get('/tipo/:tipo', productosController.getProductoTipo);
router.put('/:id', productosController.editarProducto);
router.delete('/:id', productosController.eliminarProducto);


module.exports = router;