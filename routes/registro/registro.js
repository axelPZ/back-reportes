const { Router } = require('express');
const router = new Router();
const { check } = require('express-validator');

const { getAllRegistros, getRegistrosByDepartamentoMunicipio, getRegistrosByEvento, addRegistro, deleteRegistro, updateRegistro, getIdRegistro } = require('../../controllers/registros/registros'); 
const { validateJWT } = require('../../middlewares/global/validateJWT');
const { isAdmin, validate, existEventId, validText, validAN } = require('../../middlewares/global/validates');
const { customLimiter } = require('../../middlewares/global/customLimitter');

// Obtener todos los registros
router.get('/', [
  customLimiter,
], getAllRegistros);
/*
// Obtener registros por departamento y municipio
router.get('/:departamento/:municipio', [
  customLimiter,
  validateJWT
], getRegistrosByDepartamentoMunicipio);*/

// Obtener registros por tipo de evento
router.get('/evento/:idEvento', [
  customLimiter,
  validateJWT
], getRegistrosByEvento);

// Agregar un nuevo registro
router.post('/', [
  customLimiter,
  validateJWT,
 // isAdmin(true),
  check("idEvento", "El ID del evento es requerido.").notEmpty(),
  check("idEvento", "El ID del evento no valido.").isNumeric(),
  existEventId(true),
  check("Fecha", "La fecha es requerida.").notEmpty(),
  check("Fecha", "La fecha no es valida.").isDate(),
  check("cordenadas", "Las coordenadas son requeridas.").notEmpty(),
  //check("municipio", "El municipio es requerido.").notEmpty(),
  //check("municipio") .custom( validText ),
  //check("departamento", "El departamento es requerido.").notEmpty(),
  //check("departamento") .custom( validText ),
  //check("direccion", "La dirección es requerida.").notEmpty(),
  //check("direccion") .custom( validAN ),
  check("descripcion", "La descripción es requerida.").notEmpty(),
  check("descripcion") .custom( validAN ),
  check("Hora", "La Hora es requerida.").notEmpty(),
  //check("Imagen1", "Formato de la imagen no valido").isBase64(),
  //check("Imagen2", "Formato de la imagen no valido").isBase64(),
  validate
], addRegistro);

// Eliminar un registro por su ID
router.delete('/:id', [
  customLimiter,
  validateJWT,
  isAdmin(true),
], deleteRegistro);

// Obtener un regsitro por id
router.get('/Search/:id', [
  customLimiter,
], getIdRegistro);

// Actualizar un registro por su ID
router.put('/:id', [
  customLimiter,
  validateJWT,
  isAdmin(true),
  check("idEvento", "El ID del evento es requerido.").notEmpty(),
  check("idEvento", "El ID del evento no valido.").isNumeric(),
  check("Fecha", "La fecha es requerida.").notEmpty(),
  check("Fecha", "La fecha no es valida.").isDate(),
  check("cordenadas", "Las coordenadas son requeridas.").notEmpty(),
  check("municipio", "El municipio es requerido.").notEmpty(),
  check("municipio") .custom( validText ),
  check("departamento", "El departamento es requerido.").notEmpty(),
  check("departamento") .custom( validText ),
  check("direccion", "La dirección es requerida.").notEmpty(),
  check("direccion") .custom( validAN ),
  check("descripcion", "La descripción es requerida.").notEmpty(),
  check("descripcion") .custom( validAN ),
  check("fotos", "Las fotos son requeridas.").notEmpty(),
  validate
], updateRegistro);

module.exports = router;
