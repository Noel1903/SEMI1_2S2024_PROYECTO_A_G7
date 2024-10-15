
//Retorna fehca y hora
function getDateTime(formatoHora) {
    const date = new Date();
    const [horas, minutos, segundos] = formatoHora.split(':');
    
    date.setHours(horas);
    date.setMinutes(minutos);
    date.setSeconds(segundos);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    const localDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    return localDateTime;
}

//Retorna solo el horario
function getLocalTime(formatoHora) {
    const date = new Date(formatoHora);
    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    const segundos = date.getSeconds().toString().padStart(2, '0');
    
    return `${horas}:${minutos}:${segundos}`;
}

// Retorna solo la fecha
function getFecha(fecha) {
    const date = new Date(fecha);
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    
    return `${año}-${mes}-${dia}`;
}

module.exports = {getDateTime,getLocalTime,getFecha};

