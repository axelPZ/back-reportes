const { request, response } = require('express');
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Config = require('../../config/config');
const config = new Config();

const Usuarios = require('../../models/usuarios/usuarios');
const usr = new Usuarios();


const Plantillas = require('../../config/static/plantillasCorreo');
const plantillas = new Plantillas();

const { enviarCorreo } = require('../../config/enviarCorreos');


    const login = async(req = request, res= response)=>{
        try {

            let { Password } = req.body;
            const user = req.User;
            const userPassword = user.password;

            // Comparar contrasenias para identificar que es correcta o no
            const verify = bcrypt.compareSync(Password, userPassword);
            if ( !verify )  return res.status(400).json( { Mensaje: 'Contraseña Incorrecta' } );
            

            //creamos el token
            var token = jwt.sign({ idUser: user.id_usuario, userEmail: user.correo, rol: user.rol }, config.keyjwt, { expiresIn: '1h' });
          
            const userMap = {
                Nombre: user.nombres,
                Apellidos: user.apellidos,
                Correo: user.Correo,
                Rol: user.rol,
                Edad: user.Edad
            }

            return res.status(200).json({
                user: userMap,
                token
            })

        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }

    //enviar correo para cambiar la contraseña
    const verifyEmail = async (req= Request, res= Response) => {
        try {
            const { Correo} = req.body;
            const { nombres, apellidos, rol } = req.User;
            const token =  jwt.sign({ userEmail: Correo, rol: rol }, config.keyjwt, { expiresIn: '10m' })
                            
           
            const url = config.FrontOrigen + config.RecuperarContrasenia + token;
            console.log("URL ", url);
            const plantilla = plantillas.cambioContraseña(url, nombres, apellidos);
            const seEnvioCorreo = await enviarCorreo( Correo, plantilla, 'Cambio de contraseña' );
           
           
           if(seEnvioCorreo) return res.status(200).json({"Mensaje":`Se a enviado un mensaje al correo : '${Correo}'`});

           return res.status(500).json({Mensaje: 'No se pudo enviar el correo de cambio de contraseña al usuario: '+Correo})

        } catch (err) {
            console.log(err);
            return res.status(200).json({"Mensaje":err.message})
        }
    }

   

    //validar token
    const validateJWT = async( req = request, res = response )=>{
        const { tokenadm }  = req.headers;
        try {
            if( !tokenadm ) return res.status(400).json({Mensaje: 'No se pudo obtener el token de los headers'});
            const { userEmail, rol, tipo } = jwt.verify(tokenadm, config.keyjwt );
            console.log("TIPOOOO ", tipo);
            //creamos el token
            var token = jwt.sign( { userEmail: userEmail, rol: rol, tipo: tipo }, config.keyjwt, { expiresIn: '15m' } );
             
            if( userEmail && rol ) return res.status(200).json({Mensaje: 'Token valido', Usuario: { Correo: userEmail, Rol: rol, Tipo: tipo }, token : token } );
            


            return res.status(400).json({Mensaje: 'Token no valido'});
        } catch (err) {
            console.log(err);
            if( err.message == "jwt expired") return res.status(401).json({"Mensaje":"Token a expirado"});
            if( err.message == "invalid token") return res.status(400).json({"Mensaje":"Token no valido"});   
            return res.status(500).json({Mensaje: err.message});
        }
    }

     // cambiar la contraseña
     const changePassowrd = async(req= Request, res= Response)=>{
        try {
            const { Token, Password } = req.body
            const { userEmail } = jwt.verify(Token, config.keyjwt );

            console.log( jwt.verify(Token, config.keyjwt ) );

            if( !userEmail ) return res.status(400).json({"Mensaje":"Token no valido"});
             
                /* Convertimos contrasenia cruda en cifrada */
                const salt = bcrypt.genSaltSync(10);
                const Pass = bcrypt.hashSync(Password, salt);
                let exito = '';
                
                usr.correo = userEmail.toUpperCase();
                usr.password = Pass;
                exito = await usr.changePassword();
              
               

                if( exito && exito.affectedRows > 0 ) return res.status(200).json( { Mensaje: 'Se a cambido la contraseña correctamente '} );
                return res.status(500).json( { Mensaje: 'Ocrrio un error al intentar cambiar la contraseña '} );

        } catch (err) {
            console.log(err.message);
            if( err.message == "jwt expired") return res.status(400).json({"Mensaje":"El Token a expirado, por favor vuelva a solicitar el cambio de contraseña"});
            if( err.message == "invalid token") return res.status(400).json({"Mensaje":"Token no valido, por favor vuelva a solicitar el cambio de contraseña"});   
            return res.status(500).json({Mensaje: err.message});
        }
    } 

module.exports = {
    login,
    validateJWT,
    verifyEmail,
    changePassowrd
};