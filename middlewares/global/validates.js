const { request, response } = require('express');
const { validationResult } = require('express-validator');

const User = require('../../models/usuarios/usuarios');
const Eventos = require('../../models/eventos/eventos');

//Validar si ya existe un evento con es nombre
const existEvent = (tipo)=>{
    return async( req = request, res = response, next )=> {
        const nombre = (tipo) ? req.body.Nombre : req.params.Nombre;
        console.log("Nombre ", nombre);
        if( nombre ){
            const evento = new Eventos();
            evento.nombre = nombre.toUpperCase();
            const existe = await evento.getName();
            if(existe.length > 0 && tipo ) return res.status(400).json({"Mensaje": `Ya existe un evento con el nombre ${nombre}`});
            if(existe.length <= 0 && !tipo ) return res.status(404).json({"Mensaje": `No existe un evento con el nombre ${nombre}`});
            if(!tipo) req.Evento = existe[0];
            next();

        }else {
            if(!tipo) return res.status(400).json({"Mensaje":"No se pudo obtener el nombre del evento"});
            next();
        }
    }
}

//validar si exsite un evento con el id indicado
const existEventId = (tipo)=>{
    console.log("tipoEventoss ", tipo );
    return async( req = request, res = response, next ) => {
        const { idEvento } = req.body;
        if( idEvento ){
            const evento = new Eventos();
            evento.id = idEvento;
            const existe = await evento.getId();
            if(existe.length <= 0 ) return res.status(404).json({"Mensaje": `No existe un evento con el id ${idEvento}`});
        }
        next();
    }
}


const validate = ( req = request, res = response, next )=>{
    const errors = validationResult( req );
    if( !errors.isEmpty() ) return res.status(400).json(errors);
    next();
}

// validaciones del correo
const ExisteCorreo = ( tipo )=> {
    return async( req = request, res = response, next )=>{
        let { Correo } = req.body;
        if( Correo ){
            Correo = Correo.toUpperCase();
            const usr = new User();
            usr.correo = Correo;
            const existUser = await usr.getUserEmail();
            if( existUser.length <= 0 && tipo )return res.status(404).json({"Mensaje": `No se encontro el usuario con el correo: '${Correo}'.`});
            if( existUser.length > 0 && !tipo )return res.status(404).json({"Mensaje": `Ya existe el usario con el correo: '${Correo}'.`});
            if( tipo ) req.User = existUser[0];
            next();
        }else {
            next();
        }
    }
}

//validacion de correo en el login
const ValidateCorreoLogin = ( tipo )=>{
    return async( req = request, res = response, next )=>{
        let { Correo } = req.body;
        if( Correo  ){
            console.log(Correo);

            let validacion =  new User();
            validacion.correo = Correo.toUpperCase();
            const exist = await validacion.getUserEmail();
            if( exist.length <= 0 )return res.status(404).json({"Mensaje": `No se encontro el usuario con el correo: '${Correo}'.`});
            req.User = exist[0];
           next(); 
        }else {
            next();
        }
    }
}

//Validar el tipo de usuario
const validTipo = async( Value )=> {
    const isValid = [ "CLIENTE", "USUARIO"].filter( e => e == Value.toUpperCase() );
    if( isValid <= 0) throw new Error(`El tipo de usuario: '${Value}', no es valido, validos: 'CLIENTE' y 'USUARIO'.`);
}

const validText = async(Value)=> {
    console.log("value ", Value);
    const isValid = Value.replace( /[^A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ ]/gi, "");
    if( isValid != Value ) throw new Error(`El valor: '${Value}', No es valido`);
}

const validAN = async(Value)=> {
    console.log("Vale ", Value  );
    const isValid = Value.replace( /[^A-Za-z0-9äÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ\.,/\-;: \n]/gi, "");
    if( isValid != Value ) throw new Error(`El valor: '${Value}', contiene caracteres no permitidos`); 
}

const validDireccion = async(Value)=> {
    const isValid = Value.replace( /[^A-Za-z0-9äÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ\-:\. ]/gi, "");
    if( isValid != Value ) throw new Error(`El valor: '${Value}', contiene caracteres no permitidos`); 
}

const validRol = async( Value )=> {
    const isValid = [ "ADMINISTRADOR", "USUARIO"].filter( e => e == Value.toUpperCase() );
    if( isValid <= 0) throw new Error(`El rol: '${Value}', no es valido, validos: 'ADMINISTRADOR' y 'USUARIO'.`);
}

//validar la contraseña
const validatePass = async( Password )=>{
    const PassAcept = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/;
    if( !PassAcept.test( Password ) )throw new Error("Contraseña invalida, la contraseña debe de tener por lo menos, 1 Mayuscula, 1 Minuscula, 1 Digito y 1 un caracter especial");
}

//validar si es administrador
const isAdmin = (tipo)=>{
    return async(req = request, res = response, next )=>{
        const userLogin = req.userLogin;
        if( !userLogin || userLogin.Rol != 'ADMINISTRADOR') return res.status(403).json( { 'Mensaje': 'Usuario sin permisos para realizar esta acción.'} );
        next();
    }
}

//validar si es usuario
const isUser = (tipo)=>{
    return async(req = request, res = response, next )=>{
        const userLogin = req.userLogin;
        if( !userLogin || userLogin.Rol != 'USUARIO') return res.status(403).json( { 'Mensaje': 'Usuario sin permisos para realizar esta acción.'} );
        next();
    }
}

//validar correo por parametro
const ExisteCorreoParams = ( tipo ) => {
    return async( req = request, res = response, next )=>{
        let { Correo } = req.query;
        if( Correo ){
            Correo = Correo.toUpperCase();
            const usr = new User();
            usr.correo = Correo;
            const existUser = await usr.getUserEmail();
            if( existUser.length <= 0 && tipo )return res.status(404).json({"Mensaje": `No se encontro el usuario con el correo: '${Correo}'.`});
            if( existUser.length > 0 && !tipo )return res.status(404).json({"Mensaje": `Ya existe el usario con el correo: '${Correo}'.`});
            if( tipo ) req.UserParams = existUser[0];
            next();
        }else {
            if( tipo ) return res.status(400).json({'Mensaje':   `No se recibio el parametro: 'Correo'` } );
            next();
        }
    }
}

module.exports = {
    validate,
    ExisteCorreo,
    validText,
    validAN,
    validRol,
    validatePass,
    isAdmin,
    ExisteCorreoParams,
    validDireccion,
    ValidateCorreoLogin,
    validTipo,
    isUser,
    existEvent,
    existEventId
}