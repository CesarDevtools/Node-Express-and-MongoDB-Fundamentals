// RUTA DE AUTENTICACIÓN (/auth)
// Este archivo maneja todas las peticiones relacionadas con el login/autenticación de usuarios
// Se encarga de verificar credenciales y generar tokens de acceso

const express = require('express');
const router = express.Router();
// Importar el controlador que contiene la lógica para autenticar usuarios
const authController = require('../controllers/authController');

// POST /auth - INICIAR SESIÓN (LOGIN)
// Ruta que recibe credenciales del usuario (username/email y password)
// Verifica las credenciales y devuelve un token JWT si son válidas
router.post('/', authController.handleLogin);

// Exportar el router para ser montado en server.js como: app.use('/auth', require('./routes/auth'))
// Esto significa que todas las rutas aquí definidas tendrán el prefijo '/auth'
module.exports = router; 