const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem + '\n');

        } catch (err) {
            console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqlog.txt'); // Registrar petición en archivo de log
    console.log(`${req.method} ${req.path}`); // Log de la petición
    next();
}

// EXPORTAR LA FUNCIÓN
// module.exports permite que otros archivos importen esta función
// Uso: const logEvents = require('./logEvents');
module.exports = { logEvents, logger };