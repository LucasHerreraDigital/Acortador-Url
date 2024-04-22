//importamos express    
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./router');
const mongoose = require('mongoose');

//importar variables de entorno virtuales
require('dotenv').config({path: 'variables.env'});



const app = express();

//body parser para leer los datos del formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

//declaramos pug
app.set('view engine', 'pug');

//carpeta para las vistas
app.set('views', path.join(__dirname, '/views'));

//cargo los archivos estaticos en public
app.use(express.static('public'));


//definimos las rutas
app.use('/',routes())


//Leer localhost de variables y puertos
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port,host, () => {
    console.log('El servidor esta funcionando');
}) 