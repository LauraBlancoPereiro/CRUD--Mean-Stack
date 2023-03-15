// Configuracion de la base de datos

const mongoose = require('mongoose');

const URI = 'mongodb://localhost/joyeria'; // Si la base de datos no existe, mongodb la crea

mongoose.connect(URI)
    .then(db => console.log("DB is connected"))
    .catch(err => console.log(err));

module.exports = mongoose;