const Connection = require('../config/connection');
const connection = new Connection();


class User {

    constructor(id, nombre, apellido, edad, email ){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
    }


    async getUsers(){
        try{
            const users = await connection.con.query('SELECT * FROM usuario');
            return users;
        }catch( err ){
            console.log( err );
            return false;
        }
    }

    async createUser(){

        const data = {
            nombre: this.nombre,
            apellido: this.apellido,
            edad: this.edad,
            email: this.email
        }

        try{
            await connection.con.query(`INSERT INTO usuario SET ?`, [data]);
            return true;
        }catch( err ){
            console.log( err );
            return false;
        }
    }
}

module.exports = User;