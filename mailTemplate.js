const moment = require("moment")

const templateCorreo = (respuestaCorreo,asunto,template)=>{
    const objetoDatosCorreo = {
        date: moment().format(),
        from:respuestaCorreo.envelope.from,
        to:respuestaCorreo.envelope.to,
        asunto: asunto,
        contenido: template
      }
      
    const datosCorreo = JSON.stringify(objetoDatosCorreo)
    return datosCorreo
}

module.exports = templateCorreo