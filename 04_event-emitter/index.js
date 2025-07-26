// Importamos nuestra función de logging personalizada
const logEvents = require('./logEvents');

// Importamos el módulo EventEmitter nativo de Node.js
const EventEmitter = require('events');

// Creamos nuestra propia clase que hereda de EventEmitter
class MyEmitter extends EventEmitter {};

// Instanciamos nuestra clase personalizada
const myEmitter = new MyEmitter();

// Escuchamos el evento 'log' y ejecutamos logEvents cuando ocurra
myEmitter.on('log', (message) => {
    logEvents(message);
});

// Después de 2 segundos, emitimos el evento 'log' con un mensaje
setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted!');
}, 2000);

