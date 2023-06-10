import { Router } from "express";
import VendedorController from "../controller/VendedorController";
const routes = Router();
routes.get("", VendedorController.getAll);
routes.get("/getById/:Ruc_cliente", VendedorController.getById);
export default routes;