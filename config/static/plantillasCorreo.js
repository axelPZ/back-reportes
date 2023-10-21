
module.exports = class Plantillas{

    cambioContraseña(url, nombres, apellidos ){
        return `
        <body style="background: #ccc; padding: 40px">
        <div style="display: flex; flex-direction: column; width: 100%; align-items: center;">
            <div style="padding-bottom: 30px; background: white;width: 500px;border: 2px solid rgba(9,9,121,1);border-radius: 43px 43px 0 0;text-align:center">
                <div class="cabecera" style="color: white;height: 100px;background-color: rgba(9,9,121,1);display: flex;align-items: center;justify-content: center;border-radius: 40px 40px 0 0;">
                    <h2 style="width: 100%; text-align: center;">Cambio de contraseña</h2>
                </div>
                <div>
                    <p style="font-weight: bold; line-height: 24px; letter-spacing: 1px; padding: 10px 25px; text-align: justify;">Hola, hemos recibido una solicitud de recuperación de contraseña, si no ha sido usted el que envio dicha solicitud por favor ignore este correo, <br>
                     de lo contrario haga click en el siguiente enlace para pro-seguir con la recuperación.</p>
                     <a style="color: white; font-weight:bold; background:rgba(9,9,121,1); padding: 10px; border-radius: 10px; margin-bottom: 20px!important;" href="${url}">Cambiar Contraseña</a>
                </div>
            </div>
        </div>
    </body>`;
    }

    nuevoPedido(url, usuario, id ){
        return  `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Correo</title>
        </head>
        <body style="background: #ccc; padding: 40px">
            <div style="display: flex; flex-direction: column; width: 100%; align-items: center;">
                <div style="padding: 10px; background: white; width: 500px; border: 2px solid #0a7fb7; border-radius: 40px 0 40px 0; text-align:center">
                    <img width="200" src="https://media.istockphoto.com/id/1271477227/es/vector/icono-de-l%C3%ADnea-de-color-acuerdo-contrato-y-oferta-propuesta-de-ilustraci%C3%B3n-vectorial-lineal.jpg?s=612x612&w=0&k=20&c=w3NtpGprX-ECmBQIk4pa66WKFeeD8CdEOAU8vlD9xAs=" alt="">
                    <div>
                        <p style="font-weight: bold; line-height: 24px; letter-spacing: 1px; padding: 10px 5px">Hola, has recibido una solicitud del usuario '${usuario}', para ver los detalles o autorizar de dicha solicitud la cual tiene el id: '${id}', por favor de ingresar al portal 'AppReportes'.  </p>
                         <a style="color: white; font-weight:bold; background:#0a7fb7; padding: 10px; border-radius: 10px 0 10px 0;" href="${url}">Ir a pedidos</a>
                    </div>
                </div>
            </div>
        </body>
        </html>`;
    }


    cambioEstado(url, id, estado ){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Correo</title>
        </head>
        <body style="background: #ccc; padding: 40px">
            <div style="display: flex; flex-direction: column; width: 100%; align-items: center;">
                <div style="padding: 10px; background: white; width: 500px; border: 2px solid #0a7fb7; border-radius: 40px 0 40px 0; text-align:center">
                    <img width="200" src="https://media.istockphoto.com/id/1271477227/es/vector/icono-de-l%C3%ADnea-de-color-acuerdo-contrato-y-oferta-propuesta-de-ilustraci%C3%B3n-vectorial-lineal.jpg?s=612x612&w=0&k=20&c=w3NtpGprX-ECmBQIk4pa66WKFeeD8CdEOAU8vlD9xAs=" alt="">
                    <div>
                        <p style="font-weight: bold; line-height: 24px; letter-spacing: 1px; padding: 10px 5px">Hola, se va  '<b>${estado}<b>' el pedido con el id ${id}. El cual puedes ver a detalle si ingresar en el link a continuacion. <br><br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto temporibus nihil ipsum libero porro, veritatis laborum cumque a odio nemo, tempore, id laboriosam repellat deleniti soluta unde. Eum, saepe aspernatur?  </p>
                         <a style="color: white; font-weight:bold; background:#0a7fb7; padding: 10px; border-radius: 10px 0 10px 0;" href="${url}">VerPedido</a>
                    </div>
                </div>
            </div>
        </body>
        </html>`;
    }
}