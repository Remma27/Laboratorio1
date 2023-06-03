import * as express from "express";
import cors = require("cors");
import helmet from "helmet";
import ClienteController from "./controller/ClienteController";
import routes from "./routes";
import { createConnection, getRepository } from "typeorm";
import { Cliente } from "../src/entity/Cliente";
import { Router } from "express";

const PORT = process.env.PORT || 3000;

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'dbLab1',
  entities: [Cliente],
  synchronize: true,
})
  .then(async () => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    app.use("/", routes);

    const clienteRepository = getRepository(Cliente);

    const cliente1 = new Cliente();
    cliente1.nombre = "Juan";
    cliente1.apellido1 = "Pérez";
    cliente1.apellido2 = "Gómez";
    cliente1.fechaNacimiento = new Date("1990-01-01");
    cliente1.genero = "M";
    cliente1.estado = true;
    await clienteRepository.save(cliente1);

    const cliente2 = new Cliente();
    cliente2.nombre = "María";
    cliente2.apellido1 = "López";
    cliente2.apellido2 = "González";
    cliente2.fechaNacimiento = new Date("1995-06-15");
    cliente2.genero = "F";
    cliente2.estado = true;
    await clienteRepository.save(cliente2);

    console.log("Data inserted successfully");

    // start express server
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en puerto: ${PORT}`)
    );

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/ to see results"
    );

    routes.get('',ClienteController.getAll);
  })
  .catch((error) => console.log("Error de conexión:", error));
