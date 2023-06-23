import { Router } from "express";
import VendedorController from "../controller/VendedorController";
const routes = Router();
routes.get("", VendedorController.getAll);
routes.get("/getById/:Codigo_vendedor", VendedorController.getById);
routes.post("", VendedorController.add);
routes.patch("/:Codigo_vendedor", VendedorController.update);
routes.delete("/:Codigo_vendedor", VendedorController.delete);
export default routes;
