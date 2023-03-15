// Aquí estarán todas las 'routers' (peticiones) que se harán desde el Frontend 
// a la base de datos. (GET, POST, PUT, DELETE)
// Las definiciones de las funciones están en 'joyas.controller.js'

const express = require('express');
const router = express.Router();

const compraController = require('../controllers/compras.controller');

router.get('/', compraController.getCompras);
router.get('/tipo/:tipo', compraController.getProductoTipo);
router.get('/compras/:id/:nombre', compraController.getCompraIDnombre);
router.get('/unico/:id', compraController.getCompraByID);
router.get('/compras/:idUsuario', compraController.getCompraID);
router.get('/verificar/:id', compraController.getVerificar);
router.get('/productos/:id', compraController.getProductoID);
router.get('/productos', compraController.getProductos);
router.post('/', compraController.createCompra);
//router.get('/usuario/:nombre', compraController.getComprasUsuario);
router.put('/:id', compraController.editarCompra);
router.put('/productos/:id', compraController.putProducto);
router.delete('/:id', compraController.eliminarCompra);


module.exports = router;