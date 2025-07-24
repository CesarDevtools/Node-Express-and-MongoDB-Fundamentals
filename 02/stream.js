const fs = require('fs');   // Importamos el módulo 'fs' para trabajar con el sistema de archivos

const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8' }); // Creamos un stream de lectura del archivo lorem.txt

const ws = fs.createWriteStream('./files/new-lorem.txt'); // Creamos un stream de escritura para el archivo new-lorem.txt

/*
rs.on('data', (datachunk) => {
    ws.write(datachunk); // Evento 'data' se dispara cada vez que hay datos disponibles para leer
});*/

rs.pipe(ws); // Usamos pipe para conectar el stream de lectura al de escritura