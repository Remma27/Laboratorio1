import { Router } from "express";
import Detalle_FacturaController from "../controller/Detalle_FacturaController";
const routes = Router();
routes.get("", Detalle_FacturaController.getAll);
routes.get("/getById/:Ruc_cliente", Detalle_FacturaController.getById);
export default routes;