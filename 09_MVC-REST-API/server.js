const express = require('express');
const app = express();
const path = require('path');
// Importar función de logging personalizada desde archivo externo
const { logger } = require('./middleware/logEvents');
// Importar manejador de errores personalizado
const errorHandler = require('./middleware/errorHandler');
// Importar CORS para manejar solicitudes de diferentes orígenes (Cross-Origin Resource Sharing)
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

// MIDDLEWARE PERSONALIZADO PARA LOGGING
// Registra todas las peticiones que llegan al servidor
app.use(logger);



// Aplicar configuración CORS a todas las rutas
app.use(cors(corsOptions));

// MIDDLEWARE PARA PARSEAR DATOS DE FORMULARIOS HTML
// Permite leer datos enviados desde formularios (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));

// MIDDLEWARE PARA PARSEAR JSON
// Permite leer datos JSON enviados en el body de las peticiones
app.use(express.json());

// MIDDLEWARE PARA SERVIR ARCHIVOS ESTÁTICOS
// Sirve archivos CSS, JS, imágenes, etc. desde la carpeta 'public' (static files)
app.use(express.static(path.join(__dirname, '/public')));

// Rutas principales
app.use('/', require('./routes/root')); // Importar rutas del directorio raíz
app.use('/employees', require('./routes/api/employees')); // Importar rutas de empleados

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