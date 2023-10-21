const { request, response } = require('express');
const Registro = require('../../models/registros/registro'); 

// Controlador para obtener todos los registros
const  getAllRegistros = async(req = request, res=response)=>{
  const registro = new Registro();
  let registros = await registro.getAllDate();
  if (registros) {
    registros = await Promise.all( registros.map( async (r) => {
      r.fecha = ( r.fecha ) ? await  mapDate(r.fecha) : r.fecha;
      return r;
    }))
    res.json(registros);
  } else {
    res.status(500).json({ error: 'Error al obtener los registros.' });
  }
}


//Obtener un registro po su id
const  getIdRegistro = async(req = request, res=response)=>{
  const { id } = req.params;
  const registro = new Registro(id, null, null, null, null, null, null, null, null, null);
  const registroInfo = await registro.getIdEvent();
  
  if( !registroInfo || registroInfo.length <=0 ) return res.status(404).json({"Mensaje":"No se encontro ningun Incidente"});
  registroInfo[0].fecha = await mapDate(registroInfo[0].fecha);
  return res.status(200).json(registroInfo[0]);
}

//Mapear la fecha
const mapDate = async(date) => {
  const fecha = new Date(date);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Ten en cuenta que los meses en JavaScript comienzan desde 0
  const anio = fecha.getFullYear();

  // Asegurémonos de que los valores tengan dos dígitos
  const diaFormateado = dia < 10 ? `0${dia}` : dia;
  const mesFormateado = mes < 10 ? `0${mes}` : mes;

  return `${diaFormateado}/${mesFormateado}/${anio}`;
}

// Controlador para obtener registros por departamento y municipio
const  getRegistrosByDepartamentoMunicipio = async(req = request, res=response) => {
  const { departamento, municipio } = req.params;
  const registro = new Registro(null, null, null, null, null, municipio, departamento, null, null, null);
  const registros = await registro.getDepartament();
  if (registros) {
    res.json(registros);
  } else {
    res.status(500).json({ error: 'Error al obtener los registros.' });
  }
}

// Controlador para obtener registros por tipo de evento
const  getRegistrosByEvento = async(req = request, res=response) =>{
  const { idEvento } = req.params;
  const registro = new Registro(null, null, idEvento, null, null, null, null, null, null, null);
  const registros = await registro.getEvent();
  if (registros) {
    res.json(registros);
  } else {
    res.status(500).json({ error: 'Error al obtener los registros.' });
  }
}

// Controlador para agregar un nuevo registro
const  addRegistro = async(req = request, res=response) =>{

  const { idEvento, Fecha, cordenadas, municipio, departamento, direccion, descripcion, fotos, Imagen1, Imagen2, Hora } = req.body;

  const registro = new Registro(null, req.userLogin.idUser, idEvento, Fecha, cordenadas, municipio, departamento, direccion, descripcion, fotos, Imagen1, Imagen2, Hora);
  const resultado = await registro.addRegistro();
  if (resultado) {
    res.json({ mensaje: 'Registro agregado con éxito.' });
  } else {
    res.status(500).json({ error: 'Error al agregar el registro.' });
  }
}

// Controlador para eliminar un registro por su ID
const  deleteRegistro = async(req = request, res=response) =>{
  const { id } = req.params;
  const registro = new Registro(id, null, null, null, null, null, null, null, null, null);
  const resultado = await registro.deleteRegist();
  if (resultado) {
    res.json({ mensaje: 'Registro eliminado con éxito.' });
  } else {
    res.status(500).json({ error: 'Error al eliminar el registro.' });
  }
}

// Controlador para editar un registro por su ID
const  updateRegistro = async(req = request, res=response) =>{
  const { id } = req.params;
  const { idEvento, Fecha, cordenadas, municipio, departamento, direccion, descripcion, fotos } = req.body;
  const registro = new Registro(id, null, idEvento, Fecha, cordenadas, municipio, departamento, direccion, descripcion, fotos);
  const resultado = await registro.updateRegist();
  if (resultado) {
    res.json({ mensaje: 'Registro actualizado con éxito.' });
  } else {
    res.status(500).json({ error: 'Error al actualizar el registro.' });
  }
}

module.exports = {
  getAllRegistros,
  getRegistrosByDepartamentoMunicipio,
  getRegistrosByEvento,
  addRegistro,
  deleteRegistro,
  updateRegistro,
  getIdRegistro
};
