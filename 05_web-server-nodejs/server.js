// IMPORTACIONES DE MÓDULOS NATIVOS DE NODE.JS
const http = require('http');        // Para crear el servidor web
const path = require('path');        // Para manejar rutas de archivos
const fs = require('fs');            // Para operaciones síncronas de archivos
const fsPromises = require('fs/promises'); // Para operaciones asíncronas de archivos

// IMPORTACIÓN DE MÓDULO PERSONALIZADO Y CONFIGURACIÓN DE EVENTOS
const logEvents = require('./logEvents');   // Función para registrar eventos en archivos
const EventEmitter = require('events');     // Para manejar eventos personalizados
class Emitter extends EventEmitter {};      // Clase que hereda capacidades de eventos
const myEmitter = new Emitter();            // Instancia para emitir y escuchar eventos

// CONFIGURAR LISTENER PARA EVENTOS DE LOG
// Cuando se emita un evento 'log', ejecutará la función logEvents
myEmitter.on('log', (message, fileName) => {
    logEvents(message, fileName);  // Registra el mensaje en el archivo especificado
});

// CONFIGURACIÓN DEL PUERTO DEL SERVIDOR
const PORT = process.env.PORT || 3500;  // Usa puerto de entorno o 3500 por defecto

// FUNCIÓN PARA SERVIR ARCHIVOS AL CLIENTE
const serveFile = async (filePath, contentType, response) => {
    try {
        // LEER ARCHIVO DEL DISCO
        // Para imágenes no usa 'utf8', para texto sí
        const rawData = await fsPromises.readFile(
            filePath, 
            !contentType.includes('image') ? 'utf8' : '');
            
        // PROCESAR DATOS SEGÚN EL TIPO DE CONTENIDO
        // Si es JSON, lo parsea; si no, usa los datos tal como están
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        
        // ESTABLECER CÓDIGO DE ESTADO Y HEADERS
        // 404 si es página de error, 200 si es contenido normal
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200, 
            { 'Content-Type': contentType });
            
        // ENVIAR RESPUESTA AL CLIENTE
        // Si es JSON lo stringify, si no lo envía tal como está
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        // MANEJO DE ERRORES
        console.log(err);
        // Registrar error en archivo de log específico
        myEmitter.emit('log', `${err.name}\t${err.message}`, 'errlog.txt');
        response.statusCode = 500;  // Error interno del servidor
        response.end(`Error: ${err.message}`);
    }
}

// CREAR EL SERVIDOR HTTP
const server = http.createServer((req, res) => {
    // LOGGING DE PETICIONES
    console.log(req.url, req.method);  // Mostrar en consola
    // Registrar petición en archivo de log específico
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqlog.txt');

    // DETERMINAR TIPO DE CONTENIDO BASADO EN LA EXTENSIÓN
    const extension = path.extname(req.url);  // Obtener extensión (.css, .js, etc.)

    let contentType;

    // MAPEAR EXTENSIONES A TIPOS MIME
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';  // Por defecto HTML
    }

    // CONSTRUIR RUTA DEL ARCHIVO A SERVIR
    let filePath =
        // Si es HTML y la URL es '/', servir index.html
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            // Si es HTML y termina en '/', buscar index.html en esa carpeta
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                // Si es HTML normal, buscar en views
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    // Si no es HTML, buscar en directorio raíz
                    : path.join(__dirname, req.url);

    // PERMITIR URLs SIN EXTENSIÓN .html
    // Si no hay extensión y no termina en '/', agregar .html
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    // VERIFICAR SI EL ARCHIVO EXISTE
    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // Si existe, servir el archivo
        serveFile(filePath, contentType, res);
    } else {
        // MANEJO DE ARCHIVOS NO ENCONTRADOS
        switch (path.parse(filePath).base) {  // Obtener nombre del archivo
            case 'old-page.html':
                // REDIRECCIÓN 301 (permanente) para página antigua
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                // REDIRECCIÓN 301 a la página principal
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                // MOSTRAR PÁGINA 404 PARA CUALQUIER OTRO ARCHIVO NO ENCONTRADO
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }

});

// INICIAR EL SERVIDOR
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));