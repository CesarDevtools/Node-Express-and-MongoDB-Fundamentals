// Importamos fs.promises para usar async/await en lugar de callbacks
// Esto hace que el código asíncrono se vea más limpio y sea más fácil de leer
const fsPromises = require('fs').promises;
// Importamos el módulo path para manejar rutas de archivos de forma segura
const path = require('path');

// FUNCIÓN ASÍNCRONA - Usamos 'async' para poder usar 'await' dentro
// async/await es una forma moderna de manejar operaciones asíncronas
const fileOps = async () => {

    // TRY-CATCH para manejar errores de todas las operaciones asíncronas
    // Si cualquier operación falla, el catch capturará el error
    try {
        // AWAIT - Espera a que se complete la lectura del archivo antes de continuar
        // Sin await, esto devolvería una Promise pendiente
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log('Contenido del archivo:', data);

        // UNLINK - Elimina/borra un archivo del sistema de archivos
        // Es equivalente a "delete" en otros lenguajes o "rm" en terminal
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt')); // Elimina el archivo starter.txt
        
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nGenial!.');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseWriteRenamed.txt'));

        // Leemos el archivo final para verificar que todo funcionó correctamente
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseWriteRenamed.txt'), 'utf8');
        console.log('Nuevo contenido del archivo:', newData);
        
    } catch (err) {
        // CATCH - Captura cualquier error que ocurra en las operaciones anteriores
        // Esto incluye errores de archivo no encontrado, permisos, etc.
        console.error('Error al leer el archivo:', err);
    }

};

// EJECUTAR LA FUNCIÓN ASYNC
// Sin esta línea, la función se define pero nunca se ejecuta
fileOps();
