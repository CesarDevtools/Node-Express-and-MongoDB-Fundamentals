// IMPORTANTE: Si alguien clona este repositorio desde GitHub, NO tendrá la carpeta node_modules
// porque está incluída en .gitignore y no se sube al repositorio
// 
// SOLUCIÓN: Después de clonar, la persona debe ejecutar:
// npm install
// 
// Este comando leerá el archivo package.json y descargará automáticamente
// todas las dependencias necesarias en una nueva carpeta node_modules

const { format } = require ('date-fns'); // Importamos la función 'format' del paquete date-fns

const { v4: uuid } = require('uuid'); // Importamos la función 'v4' de uuid para generar identificadores únicos

console.log(format(new Date(), 'dd/MM/yyyy')); // Formateamos la fecha actual como 'día/mes/año'

console.log(uuid()); // Generamos un nuevo UUID (Identificador Único Universal) y lo mostramos en consola

console.log(uuid()); // Generamos otro UUID para demostrar que cada llamada produce un valor único