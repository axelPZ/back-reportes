module.exports = class Formatos {

    formatoFechaG(fecha){
        const dia = fecha.getDate();
        const mes = fecha.getMonth();
        const anio = fecha.getFullYear();
        return `${anio}-${mes}-${dia}`;
    }
}