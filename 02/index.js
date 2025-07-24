// Importamos el módulo 'fs' para trabajar con el sistema de archivos
// Este módulo nos permite leer y escribir archivos, entre otras operaciones
const fs = require('fs');


// SIN encoding - devuelve buffer (como el profesor)
fs.readFile('./files/starter.txt', (err, data) => {
  if (err) throw err;
  console.log('Como buffer:', data);
  console.log('Convertido a string:', data.toString());
});

// IMPORTANTE: fs.readFile() es una función ASÍNCRONA
// Esto significa que Node.js no espera a que termine de leer el archivo
// para continuar ejecutando el resto del código
// Por eso este console.log podría ejecutarse ANTES que el resultado del archivo
// El orden de ejecución puede variar: primero "Hello...." y después el contenido del archivo
console.log('Hello....');

// CON encoding - devuelve string directamente
// fs.readFile('./files/starter.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log('Contenido del archivo:', data);
// });

// MANEJO GLOBAL DE ERRORES NO CAPTURADOS
// Este event listener se ejecuta cuando hay un error que no fue manejado en ninguna parte del código
process.on('uncaughtException', (err) => {
    console.error(`Error no capturado: ${err}`); // Imprime el error en la consola
    process.exit(1); // Finaliza el proceso con código de error 1 (indica que hubo un problema)
});