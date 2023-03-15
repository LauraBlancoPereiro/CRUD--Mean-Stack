// Aquí se definiran las funciones que se utilizarán el 'productos.routes.js' para simplificar 
// y tener el codigo más ordenado.

// En cada función irá la respectiva cosulta a la base de datos.

const Compra = require('../models/compra');
const axios = require('axios');


const compraController = {};




//COMPRAS

compraController.getVerificar = function( request,response)  {

    let idUsuario = String(request.params.id);
    console.log(idUsuario);

    axios
    .get(`http://localhost:3001/usuarios`+`/${idUsuario}`)
    .then(res => {
        let respuesta = res.data[0].rol;
        if(respuesta == "cliente") {
            response.json("true");

        } else{
            response.json("false");

        }
    })
    .catch(error => {
        console.log(error);
    })

};

compraController.getProductos = function( request,response)  {


    axios
    .get(`http://localhost:3000/api/joyeria`)
    .then(res => {
        
       //console.log(res);
        response.json(res.data);
    })
    .catch(error => {
        console.log(error);
    })

};

compraController.getProductoID = function( request,response)  {

    let idProducto = String(request.params.id);

    axios
    .get(`http://localhost:3000/api/joyeria/${idProducto}`)
    .then(res => {
        
       console.log(res);
        response.json(res.data[0]);
    })
    .catch(error => {
        console.log(error);
    })

};

compraController.getProductoTipo = function(request, response){
    let tipo = String(request.params.tipo);
    axios
    .get(`http://localhost:3000/api/joyeria/tipo/${tipo}`)
    .then(res =>{
        response.json(res.data);
    })
    .catch(error => {
        console.log(error);
    })
}

compraController.putProducto = function( req,response)  {
    //console.log('Hola 1' + req.)
    const producto = {
        _id: String(req.body._id),
        tipo: String(req.body.tipo),
        material: String(req.body.material),
        marca: String(req.body.marca),
        talla: String(req.body.talla),
        cantidad: Number(req.body.cantidad),
        precio: Number(req.body.precio)
    };
    console.log(producto);
    axios
    .put(`http://localhost:3000/api/joyeria/${producto._id}`, producto)
    .catch(error => {
        console.log(error);
    })

};

/*productosController.getProductoTipo = async (req, res) => {

    const producto = await Producto.find({tipo: req.params.tipo});
    res.json(producto);
    
};*/



compraController.getCompras = async (req, res) => {
    
    const compras = await Compra.find(); //Busca en la coleccion "Productos" de mi base de datos "joyeria".
    res.json(compras);

};

compraController.createCompra = async (req, res) => {

    const compra = new Compra({
        idProducto: req.body.idProducto,
        idUsuario: req.body.idUsuario,
        cantidadUsuario:req.body.cantidadUsuario,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        
    });
    await compra.save(); //Guarda el producto creado con el post, recibido por el req en mongodb
    res.json({
        'status': 'Compra guardado'
    });

};



/*compraController.getComprasUsuario = async (req, res) => {

    const compras = await Compra.find({nombre: req.params.nombre});
    res.json(compras);
    
};*/

compraController.getCompraID = async (req, res) => {

    const compras = await Compra.find({idUsuario: req.params.idUsuario});
    res.json(compras);
    
};

compraController.getCompraIDnombre = async (req, res) => {

    const compras = await Compra.find({
        idUsuario: req.params.id,
        nombre: req.params.nombre});
    res.json(compras);
    
};

compraController.getCompraByID = async (req, res) => {

    const compras = await Compra.find({_id: req.params.id});
    res.json(compras);
    
};



compraController.editarCompra = async (req, res) => {

    const {id} = req.params;
    const compra = {
        idProducto: req.body.idProducto,
        idusuario: req.body.idusuario,
        cantidadUsuario:req.body.cantidadUsuario,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        cantidad: req.body.cantidad
    };

    
    await Compra.findByIdAndUpdate(id, {$set: compra}, {new: true});
    res.json({status: "Compra modificada"});

};

compraController.eliminarCompra = async (req, res) => {

    await Compra.findByIdAndRemove(req.params.id);
    res.json({status: "Compra elinminada"});

};



  

module.exports = compraController;
