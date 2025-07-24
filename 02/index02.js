const fs = require('fs');
// Importamos el módulo 'path' para trabajar con rutas de archivos y directorios
// Este módulo nos permite manipular rutas de manera segura y compatible con diferentes sistemas operativos
const path = require('path');
// Importamos el módulo 'fs' para trabajar con el sistema de archivos
// Este módulo nos permite leer y escribir archivos, entre otras operaciones


fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => { 
  if (err) throw err; // Si hay un error al leer el archivo, lo lanzamos
  console.log('Contenido del archivo:', data); // Mostramos el contenido del archivo en la consola
});

// SIN encoding - devuelve buffer
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), (err, data) => {
  if (err) throw err; // Si hay un error al leer el archivo, lo lanzamos
  console.log('Como buffer:', data); // Mostramos el buffer del archivo en la consola
  console.log('Convertido a string:', data.toString()); // Convertimos el buffer a string y lo mostramos
});

// IMPORTANTE: fs.readFile() es una función ASÍNCRONA
// Esto significa que Node.js no espera a que termine de leer el archivo
// para continuar ejecutando el resto del código
// Por eso este console.log podría ejecutarse ANTES que el resultado del archivo    
console.log('Hello....'); // Este mensaje se mostrará inmediatamente, sin esperar a que se lea el archivo


// fs.writeFile - ESCRITURA DE ARCHIVOS (también asíncrona)
// Esta función crea un nuevo archivo o sobrescribe uno existente
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Bien y tu.', (err) => {
    if (err) {
        console.error('Error al escribir archivo:', err); // Mostramos el error específico
        throw err; // Si hay un error al escribir el archivo, lo lanzamos
    }
    console.log('Archivo escrito correctamente'); // Mensaje de confirmación al escribir el archivo
});