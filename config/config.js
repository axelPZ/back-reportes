class Config {

    constructor(){
        this.port = process.env.PORT;
        this.database = {
            host: process.env.HOSTIS, 
            user: process.env.USERIS,
            password: process.env.PASSIS,
            database: process.env.DBIS
        };
        this.keyjwt = "Cl4v3Pr1v4d4P4r4L4Cr34C10nD3lT0k3n.%";
        this.FrontOrigen = "http://localhost:4200";
        this.RecuperarContrasenia = "/Recover/Password/";
    }
}

module.exports = Config;