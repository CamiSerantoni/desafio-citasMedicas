// Importar las dependencias necesarias
const express = require('express');
const axios = require('axios');
const uuid = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const chalk = require('chalk');

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Ruta raíz, devuelve un mensaje de bienvenida
app.get('/usuarios', (req, res) => {
    res.send('¡Bienvenido a la aplicación de citas médicas!');
});

// Ruta para registrar nuevos usuarios
app.post('/register', async (req, res) => {
    // Lógica para registrar nuevos usuarios
    // ...
});

// Ruta para consultar todos los usuarios registrados
app.get('/users', (req, res) => {
    // Lógica para consultar y devolver la lista de usuarios registrados
    // ...
});

// Middleware para manejar errores 404 (recurso no encontrado)
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado');
});

// Middleware para manejar errores 500 (error interno del servidor)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

// Iniciar el servidor y escuchar en un puerto específico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
