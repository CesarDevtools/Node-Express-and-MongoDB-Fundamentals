const fs = require('fs');


if (!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
        if (err) throw err; // Si hay un error al crear el directorio, lo lanzamos
        console.log('Directorio creado correctamente'); // Mensaje de confirmación al crear el director
    });
}

if (!fs.existsSync('./new')) {
    fs.rmdir('./new', (err) => {
        if (err) throw err; // Si hay un error al eliminar el directorio, lo lanzamos
        console.log('Directorio eliminado correctamente'); // Mensaje de confirmación al eliminar el directorio
    });
}