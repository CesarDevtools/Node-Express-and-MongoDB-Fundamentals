# 📋 EXPLICACIÓN DEL PACKAGE.JSON

## 🔍 Campos del package.json:

### **"name": "03"**
- **Qué es:** Nombre del proyecto/paquete
- **Para qué:** Aparece cuando publicas el paquete en npm
- **Importante:** Debe ser único si planeas publicarlo

### **"version": "1.0.0"**
- **Qué es:** Versión del proyecto siguiendo Semantic Versioning (SemVer)
- **Formato:** MAJOR.MINOR.PATCH
  - `1.0.0` = versión inicial estable
  - `1.0.1` = corrección de bugs
  - `1.1.0` = nueva funcionalidad (compatible)
  - `2.0.0` = cambios que rompen compatibilidad

### **"main": "index.js"**
- **Qué es:** Archivo principal/punto de entrada
- **Para qué:** Cuando alguien hace `require()` de tu paquete, carga este archivo
- **Ejemplo:** Si publicas tu paquete, `require('03')` cargaría `index.js`

### **"scripts": { ... }**
- **Qué es:** Comandos personalizados que puedes ejecutar con `npm run <nombre>`
- **"start":** `npm start` → ejecuta la aplicación en producción
- **"dev":** `npm run dev` → ejecuta con nodemon para desarrollo (auto-reinicio)

### **"author": ""**
- **Qué es:** Información del desarrollador/creador del paquete
- **Ejemplo:** `"author": "Tu Nombre <tu@email.com>"`

### **"license": "ISC"**
- **Qué es:** Licencia del proyecto
- **ISC:** Licencia permisiva (similar a MIT)
- **Para qué:** Define cómo otros pueden usar tu código

### **"description": ""**
- **Qué es:** Descripción breve del proyecto
- **Para qué:** Aparece en npm search y ayuda a entender qué hace tu app

---

## 📦 TYPES OF DEPENDENCIES

### **🏗️ DEPENDENCIES (dependencies)**
```json
"dependencies": {
  "date-fns": "^4.1.0",
  "uuid": "^11.1.0"
}
```

**¿Qué son?**
- Paquetes **NECESARIOS** para que tu aplicación funcione en producción
- Se instalan automáticamente cuando alguien hace `npm install` de tu proyecto
- **SE INCLUYEN** cuando despliegas tu app a un servidor

**Ejemplos comunes:**
- `express` - framework web
- `react` - librería UI
- `axios` - cliente HTTP
- `lodash` - utilidades

**En nuestro proyecto:**
- **date-fns:** Librería moderna para manipular fechas
- **uuid:** Genera identificadores únicos universales

### **🛠️ DEV DEPENDENCIES (devDependencies)**
```json
"devDependencies": {
  "nodemon": "^3.1.10"
}
```

**¿Qué son?**
- Paquetes que **SOLO** necesitas durante el desarrollo
- **NO** se instalan en producción (con `npm install --production`)
- Ayudan a desarrollar pero no son parte del producto final

**Ejemplos comunes:**
- `nodemon` - auto-reinicio durante desarrollo
- `jest` - testing framework
- `eslint` - linter para código
- `webpack` - bundler

**En nuestro proyecto:**
- **nodemon:** Reinicia automáticamente la app cuando cambias código

---

## 💡 DIFERENCIA PRÁCTICA

| Aspecto | Dependencies | DevDependencies |
|---------|-------------|-----------------|
| **Propósito** | "Mi app necesita esto para funcionar" | "Yo necesito esto para desarrollar" |
| **Producción** | ✅ Se instalan | ❌ NO se instalan |
| **Desarrollo** | ✅ Se instalan | ✅ Se instalan |
| **Ejemplos** | express, react, axios | nodemon, jest, eslint |

---

## ⚡ COMANDOS ÚTILES

```bash
# Instalar dependencia de producción
npm install <paquete> --save
npm install express --save

# Instalar dependencia de desarrollo
npm install <paquete> --save-dev
npm install nodemon --save-dev

# Instalar todas las dependencias
npm install

# Instalar solo dependencias de producción
npm install --production

# Ejecutar scripts
npm start        # ejecuta "start"
npm run dev      # ejecuta "dev"
npm run <script> # ejecuta cualquier script personalizado
```

---

## 🎯 RESUMEN

El `package.json` es como el **"carnet de identidad"** de tu proyecto Node.js. Contiene:

1. **Metadatos** del proyecto (nombre, versión, autor)
2. **Configuración** (archivo principal, scripts)
3. **Dependencias** necesarias para funcionar
4. **Herramientas** de desarrollo

¡Es fundamental para cualquier proyecto Node.js profesional! 🚀
