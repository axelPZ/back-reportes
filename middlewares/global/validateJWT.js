const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Config = require('../../config/config');
const config = new Config();

const validateJWT = async( req = request, res = response, next )=> {
    
    console.log("AUTH ", req.headers)
    const auth = req.header('Authorization');
    console.log("TOKEN ", auth)
    if( !auth ) return res.status(401).json({"Mensaje":"Usuario no autorizado para realizar esta petición"});

    try {
        const tokenBear = auth.split(" ");
        const token = tokenBear[1];

        if( !token || tokenBear[0] != "Bearer" ) return res.status(401).json({"Mensaje":"Usuarioss no autorizado para realizar esta petición"});

        const { userEmail, rol, idUser } = jwt.verify(token, config.keyjwt );
        
        const userLogin = { UsrEmail: userEmail, Rol: rol, idUser };
        req.userLogin = userLogin;
        next();
        
    } catch (error) {
        console.log("ERROR", error.message);
        if( error.message == "jwt expired") return res.status(401).json({"Mensaje":"Token no valido"});
        if( error.message == "invalid token") return res.status(400).json({"Mensaje":"Token no valido"});
        
        return res.status(500).json({"Mensaje":"Ocurrio un error al validar el token"});
    }
}
module.exports = {
    validateJWT
}