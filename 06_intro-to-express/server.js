// Importar el framework Express para crear el servidor web
const express = require('express');

// Crear una instancia de la aplicación Express
const app = express();

// Importar el módulo 'path' para manejar rutas de archivos de forma segura
const path = require('path');

// Definir el puerto del servidor: usa variable de entorno PORT o 3500 por defecto
const PORT = process.env.PORT || 3500;

// RUTA PARA LA PÁGINA PRINCIPAL
// Regex que coincide con "/" O "/index" O "/index.html"
// ^\/$ = solo "/" | \/index = "/index" | (\.html)? = ".html" opcional | $ = fin de string
app.get(/^\/$|\/index(\.html)?$/, (req, res) => {
    // Enviar el archivo index.html desde la carpeta views
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// RUTA PARA NEW-PAGE
// Regex que coincide con "/new-page" O "/new-page.html"
// ^\/new-page = comienza con "/new-page" | (\.html)? = ".html" opcional | $ = fin de string
app.get(/^\/new-page(\.html)?$/, (req, res) => {
    // Enviar el archivo new-page.html desde la carpeta views
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

// RUTA PARA OLD-PAGE (REDIRECCIÓN)
// Regex que coincide con "/old-page" O "/old-page.html"
app.get(/^\/old-page(\.html)?$/, (req, res) => {
    // Redireccionar permanentemente (código 301) a new-page.html
    // 301 = redirección permanente, 302 sería temporal (por defecto)
    res.redirect(301, '/new-page.html');
});

// RUTA CON MÚLTIPLES HANDLERS (MIDDLEWARE CHAIN)
// Esta ruta demuestra cómo usar múltiples funciones handler en secuencia
app.get(/^\/hello(\.html)?$/, (req, res, next) => {
    // PRIMER HANDLER: ejecuta código y pasa al siguiente con next()
    console.log('Hello there!');
    next(); // Pasa el control al siguiente handler
}, (req, res) => {
    // SEGUNDO HANDLER: envía la respuesta final
    res.send('Hello World!');
});

// CATCH-ALL ROUTE PARA MANEJAR 404 (PÁGINAS NO ENCONTRADAS)
// Regex /.*/ coincide con cualquier ruta (. = cualquier carácter, * = cero o más veces)
// Esta ruta debe ir SIEMPRE al final porque coincide con todo
app.get(/.*/, (req, res) => {
    // Establecer código de estado 404 (Not Found) y enviar página de error
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// INICIAR EL SERVIDOR
// Escuchar en el puerto definido y mostrar mensaje de confirmación
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));