const express = require('express');
const app = express();

const Usuarios = require('./usuarios/usuarios');
const Auth = require('./auth/auth');
const Eventos = require('./eventos/eventos');
const Registro = require('./registro/registro')

app.use('/Auth', Auth );
app.use('/Usuarios',  Usuarios );
app.use('/Eventos', Eventos);
app.use('/Registros', Registro)

module.exports = app;