const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');

const { login, validateJWT, verifyEmail, changePassowrd } = require('../../controllers/auth/auth');
const { customLimiter } = require('../../middlewares/global/customLimitter');
const { validate, validatePass,validTipo, ValidateCorreoLogin } = require('../../middlewares/global/validates');

router.post('/', [ 
    customLimiter,
    check('Correo', 'El correo es requerido').notEmpty(),
    check('Correo', 'Correo no valido').isEmail(),
    ValidateCorreoLogin(true),
    check("Password", "La Password es requerida").notEmpty(),
    check("Password").custom( validatePass ), 
    validate
], login );


router.get('/Validar/Token',[customLimiter], validateJWT);


router.post('/Validar/Correo', [
    customLimiter,
    check('Correo', 'El correo es requerido').notEmpty(),
    check('Correo', 'Correo no valido').isEmail(),
    ValidateCorreoLogin(true),
    validate
], verifyEmail );

router.post('/Cambiar/Password', [
    customLimiter,
    check("Password", "La Password es requerida").notEmpty(),
    check("Password").custom( validatePass ), 
    check("Token", "El token es requerido"),
    validate
], changePassowrd)
module.exports = router;