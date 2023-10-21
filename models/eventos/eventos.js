const Connection = require('../../config/connection');
const conn = new Connection();

module.exports = class Usuario {
    constructor(id, nombre, descripcion ){
        this.id = id,
        this.nombre = nombre, 
        this.descripcion = descripcion
    }

    //Obtener todos los tipos de enventos
    async getAll(){
        return await this.#executeQuery("SELECT * FROM tipo_evento;");
    }

    //Obtener todos los tipos de enventos
    async getName(){
        return await this.#executeQuery("SELECT * FROM tipo_evento WHERE nombre_evento = ?;", [this.nombre]);
    }

    //Obtener todos los tipos de enventos
    async getId(){
        return await this.#executeQuery("SELECT * FROM tipo_evento WHERE id_evento = ?;", [this.id]);
    }
    

    //Agregar tipo de evento
    async addEvent(){
        const params = [
            this.nombre,
            this.descripcion
        ]
        return await this.#executeQuery("INSERT INTO tipo_evento (nombre_evento, descripcion) VALUES (?)", [params] );
    }

    //Eliminar evento
    async deleteEvent(){
        return await this.#executeQuery("DELETE FROM tipo_evento WHERE nombre_evento = ?", [ this.nombre]);
    }

     //funcion para hacer peticiones a la base ded atos
     async #executeQuery( query, params = [] ){
        try {
            const result = await conn.con.query(query, params);
            return result;
        } catch (error) {
            console.log("Error en la consulta ", error);
            return false;
        }
    }
}