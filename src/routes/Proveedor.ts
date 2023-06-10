import { Router } from "express";
import ProveedorController from "../controller/ProveedorController";
const routes = Router();
routes.get("", ProveedorController.getAll);
routes.get("/getById/:Ruc_cliente", ProveedorController.getById);
export default routes;