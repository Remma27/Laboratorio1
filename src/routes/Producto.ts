import { Router } from "express";
import ProductoController from "../controller/ProductoController";
const routes = Router();
routes.get("", ProductoController.getAll);
routes.get("/getById/:Ruc_cliente", ProductoController.getById);
export default routes;