// CONTROLADOR DE REGISTRO DE USUARIOS
// Maneja toda la lógica de negocio para crear nuevos usuarios en el sistema
// Incluye validación, encriptación de contraseñas y persistencia de datos

// Base de datos simulada en memoria con métodos para manipular usuarios
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt'); // Librería para encriptar contraseñas de forma segura

// POST /register - MANEJAR REGISTRO DE NUEVO USUARIO
// Recibe username y password, valida datos, encripta contraseña y guarda usuario
// Retorna éxito (201) si se crea correctamente, o error según el problema encontrado
const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    
    // Validar que se recibieron ambos campos requeridos
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    // Verificar si ya existe un usuario con ese username (no duplicados)
    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); // 409 Conflict - usuario ya existe
    
    try {
        // Encriptar la contraseña con bcrypt (salt rounds = 10)
        // Esto asegura que las contraseñas nunca se guarden en texto plano
        const hashedPwd = await bcrypt.hash(pwd, 10);
        
        // Crear objeto del nuevo usuario con contraseña encriptada
        const newUser = { "username": user, "password": hashedPwd };
        
        // Agregar nuevo usuario al array en memoria
        usersDB.setUsers([...usersDB.users, newUser]);
        
        // Persistir los cambios escribiendo el archivo JSON actualizado
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        
        console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${user} created!` }); // 201 Created
    } catch (err) {
        // Manejar cualquier error durante el proceso (encriptación, escritura de archivo, etc.)
        res.status(500).json({ 'message': err.message }); // 500 Internal Server Error
    }
}

module.exports = { handleNewUser };