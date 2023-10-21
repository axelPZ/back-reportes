const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../../models/usuarios/usuarios');
const usr = new User();

//Obtener todos los Usuarios
const GetAll = async( req = request, res = response )=>{
    const allUser = await usr.getAll();
    return res.status(200).json( { 
        "Mensaje": "Todos los Usuarios",
        "Usuarios": allUser
    } );
}


//Agregar los Usuarios
const Add = async( req = request, res = response ) => {

    try {
        const { Nombres, Apellidos, Fecha, Edad, Dirreccion, Correo, Telefono, Rol, Alias, Password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const Pass = bcrypt.hashSync(Password, salt);

        usr.nombres = Nombres.toUpperCase(), 
        usr.apellidos = Apellidos.toUpperCase(), 
        usr.fecha = Fecha, 
        usr.edad = Edad, 
        usr.dirreccion = Dirreccion, 
        usr.correo = Correo.toUpperCase(), 
        usr.telefono = Telefono, 
        usr.rol = Rol.toUpperCase(), 
        usr.alias = Alias.toUpperCase(), 
        usr.pass = Pass

        const addUser = await usr.addUser();
        if( addUser && addUser.affectedRows > 0 ){
            return res.status(200).json(
                {
                    "Mensaje": "Se agrego el Usuarios correctamente",
                    "Usuarios": usr
                });
        }
        return res.status(500).json({'Mensaje':'Ocurrio un error al intentar agregar al usuario'});
    }catch( err ){
        console.log(err);
        return res.status(500).json( { "Mensaje": err.message } );
    }
}


//obtener Usuarios por id
const GetId = async( req= request, res = response ) => {
    const { Id } = req.query;
    return res.status(200).json({
        "Mensaje": "Usuarios obtenido por id",
        "Id enviado": Id
    });
}


//obtener Editar Usuarios
const Update = async( req= request, res = response ) => {

   
    const { Nombres, Apellidos, Fecha, Edad, Dirreccion, Telefono, Alias } = req.body;

    usr.correo = req.UserParams.correo;
    usr.nombres = Nombres.toUpperCase(); 
    usr.apellidos = Apellidos.toUpperCase(); 
    usr.fecha = Fecha;
    usr.edad = Edad;
    usr.dirreccion = Dirreccion; 
    usr.telefono = Telefono;
    usr.alias = Alias.toUpperCase();

    const addUser = await usr.updateUser();
    if( addUser && addUser.affectedRows > 0 ){
        return res.status(200).json({
            "Mensaje": "Se edito el Usuario correctamente",
            "Usuarios": usr
            });
        }
        return res.status(500).json( {"Mensaje": "Ocurrio un error al intentar editar el usuario"});
    }


//Eliminar Usuarios
const Delete = async( req= request, res = response ) => {
    const { Correo } = req.query;
    
    usr.correo = Correo.toUpperCase();
    const deleteUser = await usr.deleteUser();
    if( deleteUser.affectedRows > 0 ){
        return res.status(200).json({'Mensaje': `Se elimino correctamente el usuaio con el correo: '${usr.correo}';`});
    }
    return res.status(500).json({
        "Mensaje": "Ocurrio un error al intentar eliminar al usuario.",
    });
}


module.exports = {
    GetAll,
    Add,
    Delete,
    Update,
    GetId
}