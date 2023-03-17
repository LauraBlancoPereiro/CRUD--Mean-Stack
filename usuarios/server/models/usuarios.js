const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuariosSchema = new Schema({
    rol: { type: String, require: true},
    nombre: {type: String }
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);
