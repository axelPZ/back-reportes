const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { GetAll, Add, Delete, Update } = require('../../controllers/usuarios/usuarios');
const { customLimiter } = require('../../middlewares/global/customLimitter');
const { isAdmin, validate, ExisteCorreo, validText, validRol, validatePass, ExisteCorreoParams, validAN } = require('../../middlewares/global/validates');
const { validateJWT } = require('../../middlewares/global/validateJWT');

//Obtener todas los usuarios
router.get('/',[
    customLimiter
], GetAll );

// Agregar usuario
router.post('/',[
    customLimiter,
    check("Nombres", "Los nombres son requeridos.").notEmpty(),
    check("Nombres").custom(validText),
    check("Nombres", "Longitud del nombre exedida, limite 50 caracteres.").isLength({max:50}),
    check("Apellidos", "Los apellidos son requeridos.").notEmpty(),
    check("Apellidos").custom( validText ),
    check("Apellidos", "Longitud de los apellidos exedida, limite 50 caracteres.").isLength({max:50}),
    check("Edad", "La edad es requerida").notEmpty(),
    check("Edad", "Edad no valida").isNumeric(),
    check("Edad","Edad no valida").isLength({max:3}),
    check("Correo", "El correo es requerido").notEmpty(),
    check("Correo","Correo no valido").isEmail(),
    ExisteCorreo(false),
    check("Rol", "El rol es requerido").notEmpty(),
    check("Rol", "Correo no valido").isString(),
    check("Rol").custom( validRol ),
    check("Password", "La Password es requerida").notEmpty(),
    check("Password").custom( validatePass ),
    check("Alias", "El Alias es obligatorio").notEmpty(),
    check("Alias").custom( validAN ), 
    validate
], Add );


//eliminar usuario
router.delete('/',[
    customLimiter,
    validateJWT,
    isAdmin(true),
    ExisteCorreoParams(true)
], Delete );

//Editar usuario
router.put('/', [
    customLimiter,
    validateJWT,
    ExisteCorreoParams(true),
    check("Nombres", "Los nombres son requeridos.").notEmpty(),
    check("Nombres").custom(validText),
    check("Nombres", "Longitud del nombre exedida, limite 50 caracteres.").isLength({max:50}),
    check("Apellidos", "Los apellidos son requeridos.").notEmpty(),
    check("Apellidos").custom( validText ),
    check("Apellidos", "Longitud de los apellidos exedida, limite 50 caracteres.").isLength({max:50}),
    check("Edad", "La edad es requerida").notEmpty(),
    check("Edad", "Edad no valida").isNumeric(),
    check("Edad","Edad no valida").isLength({max:3}),
    check("Alias", "El Alias es obligatorio").notEmpty(),
    check("Alias").custom( validAN ),

    validate
], Update)



module.exports = router;