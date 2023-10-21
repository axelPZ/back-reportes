const {Router} = require('express');
const router = new Router();
const { check } = require('express-validator');


const { getAll, addEvento, deleteEvento } = require('../../controllers/eventos/eventos');
const { validateJWT } = require('../../middlewares/global/validateJWT');
const { isAdmin, validate, existEvent, validText, validAN } = require('../../middlewares/global/validates');
const { customLimiter } = require('../../middlewares/global/customLimitter');


//Obtener todos los eventos
router.get('/',[
    customLimiter,
], getAll );

//Eliminar el evento
router.delete('/:Nombre', [
    customLimiter,
    validateJWT,
    isAdmin(true),
    existEvent(false)
], deleteEvento );

//Agregar evento
router.post('/', [
    customLimiter, 
    validateJWT,
    isAdmin(true),
    check("Nombre", "El nombre es requerido.").notEmpty(),
    check("Nombre").custom(validText),
    check("Nombre", "Longitud del nombre exedida, limite 50 caracteres.").isLength({max:50}),
    existEvent(true),
    check("Descripcion", "La descripcion es requerida").notEmpty(),
    check("Descripcion").custom( validAN ),
    check("Descripcion", "Longitud de la descripcion exedida, limite 499 caracteres.").isLength({max:499}),
    validate
], addEvento );

module.exports = router;