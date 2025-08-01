// OBJETO DATA - Simula una base de datos en memoria
// Contiene el array de empleados y un método para actualizarlo
const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

// GET /employees - OBTENER TODOS LOS EMPLEADOS
// Función simple que devuelve el array completo de empleados
const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

// POST /employees - CREAR NUEVO EMPLEADO
// Genera un ID automático basado en el último empleado existente
// Valida que firstname y lastname sean requeridos
// Agrega el nuevo empleado al array y devuelve la lista actualizada
const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

// PUT /employees - ACTUALIZAR EMPLEADO EXISTENTE
// Busca el empleado por ID en req.body.id
// Actualiza solo los campos que se envían (firstname y/o lastname)
// Remueve el empleado viejo del array, agrega el actualizado y reordena por ID
const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
}

// DELETE /employees - ELIMINAR EMPLEADO
// Busca el empleado por ID en req.body.id
// Filtra el array para remover el empleado encontrado
// Devuelve la lista actualizada sin el empleado eliminado
const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}

// GET /employees/:id - OBTENER UN EMPLEADO ESPECÍFICO
// Busca el empleado por ID en req.params.id (viene de la URL)
// Nota: Usa req.params.id (de la URL) no req.body.id (del cuerpo de la petición)
const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}

// EXPORTAR TODAS LAS FUNCIONES
// Estas funciones se importan en el archivo de rutas employees.js
module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}