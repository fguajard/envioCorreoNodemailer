const axios = require("axios")

const obtenerIndicadores = async () =>{
    const {data:indicadores} = await axios("https://mindicador.cl/api")
    return indicadores
}

const crearPlantilla = async (contenido) =>{
    const {uf,dolar,euro,utm,bitcoin} = await obtenerIndicadores()
    const plantillaIndicadores = `
    ${contenido}\n
    <h1>Saludos!</h1>
    <h3>Los Indicadores Economicos el dia de hoy son los siguientes:</h3>
    <ul>
        <li>El valor de ${uf.nombre} el dia del hoy es: ${uf.valor} pesos</li>
        <li>El valor de ${dolar.nombre} el dia del hoy es: ${dolar.valor} pesos</li>
        <li>El valor de ${euro.nombre} el dia del hoy es: ${euro.valor} pesos</li>
        <li>El valor de ${utm.nombre} el dia del hoy es: ${utm.valor} pesos</li>
        <li>El valor de ${bitcoin.nombre} el dia del hoy es: ${bitcoin.valor} pesos</li>
    </ul>
    `   
    return plantillaIndicadores
}


module.exports = crearPlantilla