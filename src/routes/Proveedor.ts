import { Router } from "express";
import ProveedorController from "../controller/ProveedorController";
const routes = Router();
routes.get("", ProveedorController.getAll);
routes.get("/getById/:Codigo_proveedor", ProveedorController.getById);
routes.post("", ProveedorController.add);
routes.patch("/:Codigo_proveedor", ProveedorController.update);
routes.delete("/:Codigo_proveedor", ProveedorController.delete);
export default routes;
