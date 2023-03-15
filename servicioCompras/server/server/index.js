const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express(); 

const { mongoose } = require('./database');

// Settings

app.set('port', process.env.PORT || 3002);

// Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4400'}));
//app.use(cors({origin: 'http://localhost:38331'}));

// Routes

//app.use('/api/joyeria',require('./routes/productos.routes')); // El "/api" será como un prefijo 
app.use('/microservicio/compras',require('./routes/compras.routes'));


// Starting  the server
app.listen(app.get('port'), () => {

    console.log("Server on port", app.get('port'));

});