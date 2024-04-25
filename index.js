// Importa las dependencias necesarias
import axios from "axios";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import _ from "lodash";
import chalk from "chalk";


// Crear una instancia de la aplicación Express
const app = express();

let users = [];

// Ruta raíz, devuelve un mensaje de bienvenida
app.get("/", (req, res) => {
    res.send("¡Bienvenido a la aplicación de citas médicas!");
});

app.get("/usuarios", async (req, res) => {
    /* 1. El registro de los usuarios debe hacerse con la API Random User usando axios para
  consultar la data. (2 Puntos) */

    const { data } = await axios.get("https://randomuser.me/api/");
    const {
        gender,
        name: { first, last },
    } = data.results[0];

    /* 2. Cada usuario registrado debe tener un campo id único generado por el paquete UUID
  (2 Puntos) */
    const id = uuidv4().slice(0, 8);

    /* 3. Cada usuario debe tener un campo timestamp almacenando la fecha de registro
  obtenida y formateada por el paquete Moment. (2 Puntos) */
    const timestamp = moment().format("LL");

    users.push({ gender, first, last, id, timestamp });

    // Divide el arreglo de usuarios en dos, separando los usuarios por sexo
    /* 4. Por cada consulta realizada al servidor, se debe devolverle al cliente una lista con los
  datos de todos los usuarios registrados usando Lodash para dividir el arreglo en 2
  separando los usuarios por sexo. (2 Puntos) */
    let [maleUsers, femaleUsers] = _.partition(users, { gender: "male" });

    let malePlantilla = "<h2>Hombres</h2><ol>";
    for (let user of maleUsers) {
        malePlantilla += `
            <li>
                Nombre: ${user.first} ${user.last} - Género: ${user.gender} - ID: ${user.id} - Fecha: ${user.timestamp}
            </li>
        `;
    }
    malePlantilla += "</ol>";

    let femalePlantilla = "<h2>Mujeres</h2><ol>";
    for (let user of femaleUsers) {
        femalePlantilla += `
            <li>
                Nombre: ${user.first} ${user.last} - Género: ${user.gender} - ID: ${user.id} - Fecha: ${user.timestamp}
            </li>
        `;
    }
    femalePlantilla += "</ol>";

    // 5. Imprime la lista de usuarios en la consola del servidor
    console.log(chalk.blue.bgWhite("Lista de usuarios:"));
    console.log(chalk.blue.bgWhite(JSON.stringify(maleUsers, null, 2)));
    console.log(chalk.blue.bgWhite(JSON.stringify(femaleUsers, null, 2)));

    res.send(`${malePlantilla}${femalePlantilla}`);
});

// Middleware para manejar errores 500 (error interno del servidor)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Error interno del servidor");
});

// Iniciar el servidor y escucha puerto 3000
/* 6. El servidor debe ser levantado con el comando Nodemon. (1 Punto) */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
