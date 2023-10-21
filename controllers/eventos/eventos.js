const { request, response } = require('express');
const Eventos = require('../../models/eventos/eventos');
const eventos = new Eventos();

const getAll = async( req = request, res = response ) => {

    const todosEventos = await eventos.getAll();
    if( !todosEventos )return res.status(500).json({"Mensaje":"Ocurrio un error al obtener los tipos de eventos"});

    return res.status(200).json({
        "Eventos" : todosEventos
    });
}

const addEvento = async( req = request, res = response ) => {
    const { Nombre, Descripcion } = req.body;
    
    eventos.nombre = Nombre.toUpperCase();
    eventos.descripcion = Descripcion;
    const addEvent = await eventos.addEvent();
    if( addEvent && addEvent.affectedRows > 0 ){
        return res.status(200).json({
            "Mensaje": "Se agreo correctamente el tipo de evento",
            "Evento": eventos
        });
    }

    return res.status(500).json({"Mensaje":"Ocurrio un error al intentar agregar el tipo de evento"});
}

const deleteEvento = async( req = request, res = response ) => {
    const { Nombre } = req.params;
    eventos.nombre = Nombre.toUpperCase();
    const deleteEvento = await eventos.deleteEvent();
    if( deleteEvento && deleteEvento.affectedRows > 0 ){
        return res.status(200).json({
            "Mensaje": "Se elimino correctamente el tipo de evento",
            "Evento": eventos
        });
    }
    return res.status(500).json({"Mensaje":"Ocurrio un error al intentar eliminar el tipo de evento"});
}


module.exports = {
    getAll,
    addEvento,
    deleteEvento
}