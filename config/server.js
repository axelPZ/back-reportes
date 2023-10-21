
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const  Config  = require('../config/config');
const config = new Config();

class Server {

    constructor(){
        this.app = express();
        this.port = config.port;

        // middlewares
        this.middlewares();

        // rutas
        this.routes();

    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // leer y pasar los datos del body
       // this.app.use( express.json() );
         // Configuración de bodyParser para manejar cargas útiles grandes
        this.app.use(bodyParser.json({ limit: '35mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '35mb', parameterLimit: 50000, extended: true }));


        // Directorio publico
        this.app.use( express.static('public'));
    }

    routes(){

       this.app.use( '/api/Control/Seguridad', require( '../routes/index') );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor conrriendo en el puerto ' + this.port);
        });
    }
}


module.exports = Server;