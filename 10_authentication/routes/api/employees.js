// Importar Express para crear el router
const express = require('express');

// Crear una instancia del router de Express
// El router permite definir rutas modulares que se pueden montar en la aplicación principal
const router = express.Router();

// Importar el controlador de empleados que contiene toda la lógica de negocio
// Siguiendo el patrón MVC (Model-View-Controller), separamos las rutas de la lógica
const employeesController = require('../../controllers/employeesController');

// RUTAS PARA LA ENDPOINT BASE '/employees'
// router.route() permite definir múltiples métodos HTTP para la misma ruta
router.route('/')
    .get(employeesController.getAllEmployees)      // GET /employees - Obtener todos los empleados
    .post(employeesController.createNewEmployee)   // POST /employees - Crear un nuevo empleado
    .put(employeesController.updateEmployee)       // PUT /employees - Actualizar empleado existente
    .delete(employeesController.deleteEmployee);   // DELETE /employees - Eliminar un empleado

// RUTAS PARA EMPLEADOS ESPECÍFICOS POR ID '/employees/:id'
// :id es un parámetro de ruta que se puede acceder con req.params.id
router.route('/:id')
    .get(employeesController.getEmployee);         // GET /employees/123 - Obtener empleado específico por ID

// Exportar el router para que pueda ser usado en server.js
// En server.js se montará como: app.use('/employees', require('./routes/api/employees'))
module.exports = router;