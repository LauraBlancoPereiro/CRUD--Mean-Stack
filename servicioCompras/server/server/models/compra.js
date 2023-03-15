const mongoose = require('mongoose');
const { Schema } = mongoose;



const CompraSchema = new Schema({
    idUsuario: {type:String, requiered: true},
    idProducto : {type: String, required: true},
    cantidadUsuario : {type: String,required: true},
    nombre:{type: String },
    direccion: { type: String, required: true}

})

module.exports = mongoose.model('Compras', CompraSchema);
