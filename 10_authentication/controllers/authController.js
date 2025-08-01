// CONTROLADOR DE AUTENTICACIÓN (LOGIN)
// Maneja toda la lógica de negocio para autenticar usuarios existentes
// Verifica credenciales y en versiones futuras generará tokens JWT

// Base de datos simulada en memoria para acceder a los usuarios registrados
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt'); // Para comparar contraseñas encriptadas

// POST /auth - MANEJAR INICIO DE SESIÓN (LOGIN)
// Recibe credenciales, busca el usuario, verifica contraseña encriptada
// Retorna éxito si las credenciales son correctas, error 401 si no
const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    
    // Validar que se recibieron ambos campos requeridos
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    // Buscar el usuario en la base de datos por username
    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); // 401 Unauthorized - usuario no existe
    
    // Comparar la contraseña en texto plano con la versión encriptada guardada
    // bcrypt.compare() maneja automáticamente la comparación segura
    const match = await bcrypt.compare(pwd, foundUser.password);
    
    if (match) {
        // CONTRASEÑA CORRECTA - Usuario autenticado exitosamente
        // TODO: En lecciones futuras aquí se crearán tokens JWT para mantener sesión
        res.status(200).json({ 'success': `User ${user} is logged in!` });
    } else {
        // CONTRASEÑA INCORRECTA - Rechazar acceso
        res.sendStatus(401); // 401 Unauthorized
    }
}

module.exports = { handleLogin };