// Importamos módulos nativos de Node.js usando CommonJS
const os = require('os');     // Módulo para obtener información del sistema operativo
const path = require('path'); // Módulo para trabajar con rutas de archivos y directorios

// Variables globales de Node.js que nos dan información sobre el archivo actual
console.log(__dirname)  // Muestra la ruta absoluta del directorio donde está este archivo
console.log(__filename) // Muestra la ruta absoluta completa de este archivo (incluyendo nombre)

// Métodos del módulo 'os' para obtener información del sistema operativo
console.log(os.type());    // Tipo de sistema operativo (Windows_NT, Linux, Darwin)
console.log(os.version()); // Versión del sistema operativo
console.log(os.homedir()); // Ruta del directorio home del usuario actual

// Métodos del módulo 'path' para manipular rutas de archivos
console.log(path.dirname(__filename));  // Extrae solo el directorio de la ruta completa
console.log(path.basename(__filename)); // Extrae solo el nombre del archivo (server.js)
console.log(path.extname(__filename));  // Extrae solo la extensión del archivo (.js) 