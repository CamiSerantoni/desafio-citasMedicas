// Importar las dependencias necesarias
import axios from 'axios';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
// Crear una instancia de la aplicación Express
const app = express();

// Middleware para manejar solicitudes JSON
app.use(express.json());

let usuarios = [];

function saveOneUser(dataUser) {
    const { gender, name:{first, last} } = dataUser

    usuarios.push({gender, first, last, ID: uuidv4().slice(0, 6), Timestamp: moment().format('LL')})

        console.log(usuarios)
        return _.partition(usuarios, e => e.gender === 'male')
}
  

// Ruta raíz, devuelve un mensaje de bienvenida
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la aplicación de citas médicas!');
});

// Ruta para registrar nuevos usuarios
app.post('/register', async (req, res) => {

});

// Ruta para consultar todos los usuarios registrados
app.get('/usuarios', (req, res) => {
    axios.get( 'https://randomuser.me/api/')
    
    .then(response => {

        console.log(response.data.results[0]);
        const filteredData = saveOneUser(response.data.results[0]);
        let plantilla = `
        <div class="card">
            <h5>${gender}</h5>
            <p>Nombre: ${userData.name}</p>
            <p>Email: ${userData.email}</p>
            <!-- Agrega aquí más datos si los necesitas -->
        </div>
    `;


        res.send(plantilla);
    })
    .catch(error => console.log(error));
    
    })


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
