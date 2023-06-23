import { Router } from "express";
import ClienteController from "../controller/ClienteController";
const routes = Router();
routes.get("", ClienteController.getAll);
routes.get("/getById/:Ruc_cliente", ClienteController.getById);
routes.post("", ClienteController.add);
routes.patch("/:Ruc_Cliente", ClienteController.update);
routes.delete("/:Ruc_Cliente", ClienteController.delete);
export default routes;
