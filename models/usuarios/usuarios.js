const Connection = require('../../config/connection');
const conn = new Connection();

module.exports = class Usuario {

    constructor(id, nombres, apellidos, fecha, edad, dirreccion, correo, telefono, rol, alias, pass ){
        this.id = id, 
        this.nombres = nombres, 
        this.apellidos = apellidos, 
        this.fecha = fecha, 
        this.edad = edad, 
        this.dirreccion = dirreccion, 
        this.correo = correo, 
        this.telefono = telefono, 
        this.rol = rol, 
        this.alias = alias, 
        this.pass = pass
    }

    //Obtener todos los usuarios
    async getAll(){
        const query = "SELECT * FROM usuarios";
        const result = await this.#executeQuery( query ); 
        return result.map( e => {
            delete e.password;
            return e;
        });
    }

    //Obtener todos los clientes administradores
    async  getAllAdmin(){
        const query = "SELECT * FROM usuarios WHERE rol = 'ADMINISTRADOR'";
        const result = await this.#executeQuery( query ); 
        return result.map( e => {
            delete e.password;
            return e;
        });
    }

    //Agregar usuario
    async addUser(){
        const params = [
            this.nombres,
            this.apellidos,
            this.fecha,
            this.edad,
            this.dirreccion,
            this.correo,
            this.telefono,
            this.rol,
            this.alias,
            this.pass
        ]
        
        return await this.#executeQuery('INSERT INTO usuarios (nombre, apellido, fecha_de_nacimiento,  edad, direccion, correo, telefono, rol, alias_usuario, contraseña ) VALUES (?);', [ params ] );
    }

    //Agregar usuario
    async updateUser(){
        const params = [
            this.nombres,
            this.apellidos,
            this.fecha,
            this.edad,
            this.dirreccion,
            this.telefono,
            this.alias,
            this.correo
        ]
            
        return await this.#executeQuery('UPDATE usuarios SET nombre=?, apellido=?, fecha_de_nacimiento=?,  edad=?, direccion=?, telefono=?, alias_usuario=? WHERE correo = ?', params );
    }

    //obtener usuario por correo
    async getUserEmail(){
        const query = `SELECT id_usuario, nombre, apellido, fecha_de_nacimiento,  edad, direccion, correo, telefono, rol, alias_usuario, contraseña as password FROM usuarios WHERE correo = '${this.correo}';`;
        return await this.#executeQuery(query);
    }

    //eliminar usuario
    async deleteUser(){
        return await this.#executeQuery(`DELETE FROM usuarios WHERE correo = '${this.correo}';`);
    }


    //cambiar contraseña
    async changePassword(){
        return await this.#executeQuery(`UPDATE usuarios SET contraseña = '${this.password}' WHERE correo = '${this.correo}';`);
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