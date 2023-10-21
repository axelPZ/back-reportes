const Connection = require('../../config/connection');
const conn = new Connection();

module.exports = class Registro {
    constructor(id, idUsuario, idEvento, Fecha, cordenadas, municipio, departamento, direccion, descripcion, fotos, imagen1, imagen2, hora ){
        this.id=id,
        this.idUsuario=idUsuario,
        this.idEvento=idEvento,
        this.Fecha=Fecha,
        this.cordenadas=cordenadas,
        this.municipio=municipio,
        this.departamento=departamento,
        this.direccion=direccion,
        this.descripcion=descripcion,
        this.fotos=fotos,
        this.imagen1 = imagen1,
        this.imagen2 = imagen2,
        this.hora = hora;
    }

    //Obtener todos los registros
    async getAllDate(){
        return await this.#executeQuery("select cordenadas, (select nombre_evento from tipo_evento where id_evento = registro.id_evento) as evento, fecha, id_registro as id, imagen1, imagen2, hora  from registro");
    }

    //Obtener gegistro por municipio
    async getDepartament(){
        return await this.#executeQuery(`SELECT * FROM registro departamento = ? and municipio = ?`, [ this.departamento, this.municipio ] );
    }

    //Obtener por tipo de envento
    async getEvent(){
        return await this.#executeQuery(`SELECT * FROM registro id_evento = ?`, [ this.idEvento] );
    }

    //Obtener evento por su id
    async getIdEvent(){
        return await this.#executeQuery('SELECT cordenadas, id_registro as id, imagen1, imagen2, fecha, hora, registro_descripcion as descripcion, (select nombre_evento from tipo_evento where id_evento = registro.id_evento) as evento FROM registro WHERE id_registro = ?', [ this.id ]);
    }

    //agregar Registro
    async addRegistro(){
        const params = [
            this.idUsuario,
            this.idEvento,
            this.Fecha,
            this.cordenadas,
            this.municipio,
            this.departamento,
            this.direccion,
            this.descripcion,
            this.fotos,
            this.imagen1,
            this.imagen2,
            this.hora
        ]
        return await this.#executeQuery(`INSERT INTO registro (id_usuario, id_evento, fecha, cordenadas, municipio, departamento, direccion, registro_descripcion, fotos, imagen1, imagen2, hora ) VALUES (?) `, [ params ] );
    }

    //elimiar registro
    async deleteRegist(){
        return await this.#executeQuery("DELETE FROM registro WHERE id_registro = ?", [ this.id]);
    }

    //editar regsitro
    async updateRegist(){
        const params = [
            this.idEvento,
            this.Fecha,
            this.cordenadas,
            this.municipio,
            this.departamento,
            this.direccion,
            this.descripcion,
            this.fotos,
            this.id,
        ]

        return await this.#executeQuery("UPDATE registro SET id_evento, fecha, cordenadas, municipio, departamento, direccion, registro_descripcion, fotos WHERE id_registro = ?", [params])
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