// IMPORTACIONES DE LIBRERÍAS EXTERNAS
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

// IMPORTACIONES DE MÓDULOS NATIVOS DE NODE.JS
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');



// FUNCIÓN PRINCIPAL PARA REGISTRAR EVENTOS
// 'async' permite usar 'await' dentro de la función
const logEvents = async (message) => {
    // CREAR TIMESTAMP FORMATEADO
    // format() toma la fecha actual y la convierte a formato: "2025-01-24	14:30:15"
    // \t = tabulación para separar campos de manera ordenada
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    
    // CREAR LÍNEA DE LOG COMPLETA
    // Combina: fecha + ID único + mensaje, separados por tabulaciones
    // Ejemplo: "2025-01-24	14:30:15	abc123-def456	Usuario se conectó"
    const logItem = `${dateTime}\t${uuid()}\t${message}`;
    console.log(logItem); // Mostramos el log en la consola
    try {
        // VERIFICAR SI EL DIRECTORIO 'logs' EXISTE
        // existsSync() es síncrono - verifica si la ruta existe
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            // Si no existe, crear el directorio 'logs'
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        
        // ESCRIBIR LOG AL ARCHIVO
        // appendFile() agrega contenido al final del archivo (o lo crea si no existe)
        // path.join() construye la ruta de forma segura: /directorio_actual/logs/eventLog.txt
        // logItem + '\n' = agrega salto de línea al final de cada entrada
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem + '\n');
        } catch (err) {
            console.log(err);
    }
}

// EXPORTAR LA FUNCIÓN
// module.exports permite que otros archivos importen esta función
// Uso: const logEvents = require('./logEvents');
module.exports = logEvents; 