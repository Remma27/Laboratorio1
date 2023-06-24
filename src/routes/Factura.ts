import { Router } from "express";
import FacturaController from "../controller/FacturaController";
const routes = Router();
routes.post("", FacturaController.crearFactura);
routes.get("/:Numero", FacturaController.obtenerFactura);
routes.patch("/:Numero", FacturaController.modificarFactura);
export default routes;
