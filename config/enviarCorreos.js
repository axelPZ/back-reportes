const nodemailer = require("nodemailer");

const enviarCorreo = async( correo, plantilla, asunto )=> {

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
            user: "reventos172@gmail.com", // generated ethereal user
            pass: "jtssivlxyoajwzqe" // generated ethereal password
            }, 
        });

        let info = await transporter.sendMail({
            from: "reventos172@gmail.com", // sender address
            to: correo, // list of receivers
            subject: asunto, // Subject line
            //text: mensaje, // plain text body
            html: plantilla, // html body
        });

        return true;
    } catch (error) {
        console.log("Error al enviar el correo ", error);
        return false;
    } 
}

module.exports = {
    enviarCorreo
}