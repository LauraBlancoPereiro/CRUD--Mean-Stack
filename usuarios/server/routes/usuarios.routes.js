// Aquí estarán todas las 'routers' (peticiones) que se harán desde el Frontend 
// a la base de datos. (GET, POST, PUT, DELETE)
// Las definiciones de las funciones están en 'joyas.controller.js'

const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios.controller');

router.get('/', usuariosController.getUsuarios);
router.post('/', usuariosController.createUsuario);
router.get('/:id', usuariosController.getUsuarioID);
router.delete('/:id', usuariosController.eliminarUsuario);


module.exports = router;