const { logEvents } = require('./logEvents');


const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}\t${err.message}`, 'errlog.txt'); // Registrar error en archivo de log
    console.error(err.stack);
    res.status(500).send(err.message || 'Something broke!');
};


module.exports = errorHandler;
