// Aquí se definiran las funciones que se utilizarán el 'productos.routes.js' para simplificar 
// y tener el codigo más ordenado.

// En cada función irá la respectiva cosulta a la base de datos.

const Producto = require('../models/productos');

const productosController = {};

const axios = require('axios');
const { response } = require('express');

productosController.getVerificar = function( request,response)  {

    let idUsuario = String(request.params.id);

    axios
    .get(`http://localhost:3001/usuarios`+`/${idUsuario}`)
    .then(res => {
        let respuesta = res.data[0].rol;
        if(respuesta == "administrador") {
            response.json("true");

        } else{
            response.json("false");

        }
    })
    .catch(error => {
        console.log(error);
    })

};

productosController.getProductos = async (req, res) => {
    
    const productos = await Producto.find(); //Busca en la coleccion "Productos" de mi base de datos "joyeria".
    res.json(productos);

};

productosController.createProducto = async (req, res) => {

    const producto = new Producto({
        tipo: req.body.tipo,
        material: req.body.material,
        marca: req.body.marca,
        talla: req.body.talla,
        cantidad: req.body.cantidad,
        precio: req.body.precio
    });
    await producto.save(); //Guarda el producto creado con el post, recibido por el req en mongodb
    res.json({
        'status': 'Producto guardado'
    });

};

productosController.getProductoID = async (req, res) => {

    const producto = await Producto.find({_id:req.params.id})
    .catch(err => console.log(err));
    res.json(producto);
    
};


productosController.getProductoTipo = async (req, res) => {

    const producto = await Producto.find({tipo: req.params.tipo});
    res.json(producto);
    
};

productosController.editarProducto = async (req, res) => {

    const {id} = req.params;
    const producto = {
        tipo: req.body.tipo,
        material: req.body.material,
        marca: req.body.marca,
        talla: req.body.talla,
        cantidad: req.body.cantidad,
        precio: req.body.precio
    };
    console.log(producto);
    await Producto.findByIdAndUpdate(id, {$set: producto}, {new: true});
    res.json({status: "Producto modificado"});

};
  
productosController.eliminarProducto = async (req, res) => {

    await Producto.findByIdAndRemove(req.params.id);
    res.json({status: "Producto elinminado"});

};

module.exports = productosController;