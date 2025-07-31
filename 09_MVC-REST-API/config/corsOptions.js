



// CONFIGURACIÓN DE CORS (Cross-Origin Resource Sharing)
// Lista blanca de dominios permitidos para hacer peticiones al servidor
const whitelist = [
    'https://www.google.com',
    'https://127.0.0.1:5500',
    'http://localhost:3500'
];

// Opciones de configuración para CORS
const corsOptions = {
    origin: (origin, callback) => {
        // Verificar si el origen está en la lista blanca o si no hay origen (peticiones locales)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Permitir la petición
        } else {
            callback(new Error('No permitido por CORS')); // Rechazar la petición
        }
    },
    optionsSuccessStatus: 200 // Para compatibilidad con navegadores legacy
};

module.exports = corsOptions; // Exportar las opciones de CORS para usarlas en el servidor  