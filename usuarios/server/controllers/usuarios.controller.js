// Aquí se definiran las funciones que se utilizarán el 'productos.routes.js' para simplificar 
// y tener el codigo más ordenado.

// En cada función irá la respectiva cosulta a la base de datos.

const Usuario = require('../models/usuarios');

const usuariosController = {};

const axios = require('axios');

usuariosController.getUsuarios = async (req, res) => {
    
    const usuarios = await Usuario.find(); //Busca en la coleccion "Usuarios" de mi base de datos "joyeria".
    res.json(usuarios);

};

usuariosController.createUsuario = async (req, res) => {

    const usuario = new Usuario({
        rol: req.body.rol,
        nombre: req.body.nombre
    });
    await usuario.save(); //Guarda el usuario creado con el post, recibido por el req en mongodb
    res.json({
        'status': 'Usuario guardado'
    });

};

usuariosController.getUsuarioID = async (req, res) => {

    const usuario = await Usuario.find({_id: req.params.id})
    .catch(err => console.log(err));
    res.json(usuario);
    
};

  
usuariosController.eliminarUsuario = async (req, res) => {

    await Usuario.findByIdAndRemove(req.params.id);
    res.json({status: "Usuario elinminado"});

};

module.exports = usuariosController;