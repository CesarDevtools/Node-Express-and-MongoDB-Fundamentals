const express = require('express');
const app = express();
const path = require('path');
// Importar función de logging personalizada desde archivo externo
const { logger } = require('./middleware/logEvents');
// Importar manejador de errores personalizado
const errorHandler = require('./middleware/errorHandler');
// Importar CORS para manejar solicitudes de diferentes orígenes (Cross-Origin Resource Sharing)
const cors = require('cors');
const { error } = require('console');
const PORT = process.env.PORT || 3500;

// MIDDLEWARE PERSONALIZADO PARA LOGGING
// Registra todas las peticiones que llegan al servidor
app.use(logger)

// CONFIGURACIÓN DE CORS (Cross-Origin Resource Sharing)
// Lista blanca de dominios permitidos para hacer peticiones al servidor
const whitelist = ['https://www.google.com', 'https://127.0.0.1:5500', 'http://localhost:3500'];

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

// Aplicar configuración CORS a todas las rutas
app.use(cors(corsOptions));

// MIDDLEWARE PARA PARSEAR DATOS DE FORMULARIOS HTML
// Permite leer datos enviados desde formularios (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));

// MIDDLEWARE PARA PARSEAR JSON
// Permite leer datos JSON enviados en el body de las peticiones
app.use(express.json());

// MIDDLEWARE PARA SERVIR ARCHIVOS ESTÁTICOS
// Sirve archivos CSS, JS, imágenes, etc. desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '/public')));



app.get(/^\/$|\/index(\.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get(/^\/new-page(\.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get(/^\/old-page(\.html)?$/, (req, res) => {
    res.redirect(301, '/new-page.html');
});

app.get(/^\/hello(\.html)?$/, (req, res, next) => {
    console.log('Hello there!');
    next();
}, (req, res) => {
    res.send('Hello World!');
});

const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}

app.get(/^\/chain(\.html)?$/, [one, two, three]);

// MANEJO INTELIGENTE DE ERRORES 404 (PÁGINAS NO ENCONTRADAS)
// Esta ruta catch-all maneja todas las peticiones que no coinciden con ninguna ruta anterior
app.get(/.*/, (req, res) => {
    res.status(404); // Establecer código de estado HTTP 404
    
    // CONTENT NEGOTIATION: Responder según lo que el cliente acepta
    if (req.accepts('html')) {
        // Si el cliente acepta HTML (navegadores), enviar página 404 HTML
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        // Si el cliente acepta JSON (APIs, AJAX), enviar respuesta JSON
        res.json({ error: '404 Not Found' });
    } else {
        // Para cualquier otro caso, enviar texto plano
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler); // Usar el manejador de errores personalizado

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));