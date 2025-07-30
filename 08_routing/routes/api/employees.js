const express = require('express');
const router = express.Router();
const data = {}
data.employees = require('../../data/employees.json'); // Importar datos de empleados

router.route('/')
    .get((req, res) => {
        res.json(data.employees); // Devolver todos los empleados
    })
    .post((req, res) => {
        res.json({
            "firstName": req.body.firstName,
            "lastName": req.body.lastName
        }); // Devolver los datos del nuevo empleado
    })
    .put((req, res) => {
        res.json({
            "firstName": req.body.firstName,
            "lastName": req.body.lastName
        }); // Devolver los datos del empleado actualizado
    })
    .delete((req, res) => {
        res.json({
            "id": req.body.id
        }); // Devolver el ID del empleado eliminado
    });

router.route('/:id')
    .get((req, res) => {
        res.json({ "id": req.params.id }); // Devolver el ID del empleado solicitado
    }); 

    
module.exports = router;