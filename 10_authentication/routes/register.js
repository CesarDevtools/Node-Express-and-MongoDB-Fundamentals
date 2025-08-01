// RUTA DE REGISTRO DE USUARIOS (/register)
// Este archivo maneja todas las peticiones relacionadas con el registro de nuevos usuarios
// Funciona como intermediario entre las peticiones HTTP y la lógica de negocio

const express = require('express');
const router = express.Router();
// Importar el controlador que contiene la lógica para registrar usuarios
const registerController = require('../controllers/registerController');

// POST /register - REGISTRAR NUEVO USUARIO
// Ruta que recibe datos de un nuevo usuario (username, password, email, etc.)
// y los procesa para crear una cuenta nueva en el sistema
router.post('/', registerController.handleNewUser);

// Exportar el router para ser montado en server.js como: app.use('/register', require('./routes/register'))
// Esto significa que todas las rutas aquí definidas tendrán el prefijo '/register'
module.exports = router;