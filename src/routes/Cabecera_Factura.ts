import { Router } from "express";
import Cabecera_FacturaController from "../controller/Cabecera_FacturaController";
const routes = Router();
routes.get("", Cabecera_FacturaController.getAll);
routes.get("/getById/:Ruc_cliente", Cabecera_FacturaController.getById);
export default routes;