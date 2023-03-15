const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductosSchema = new Schema({
    tipo: { type: String, require: true},
    material: { type: String},
    marca: { type: String},
    talla: { type: String},
    cantidad: { type: Number, require: true},
    precio: { type: Number, require: true}
});

module.exports = mongoose.model('Productos', ProductosSchema);
