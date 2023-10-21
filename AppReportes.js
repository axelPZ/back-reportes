// importaciones
require('dotenv').config();
const Server = require('./config/server');

// instancia de mi servidor
const server = new Server();
server.listen();