const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express(); 

const { mongoose } = require('./database');

// Settings

app.set('port', process.env.PORT || 3001);

// Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4300'}));

// Routes

app.use('/usuarios',require('./routes/usuarios.routes')); // El "/admin" será como un prefijo 


// Starting  the server
app.listen(app.get('port'), () => {

    console.log("Server on port", app.get('port'));

});