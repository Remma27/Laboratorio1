import { Router } from "express";
import ProductoController from "../controller/ProductoController";
const routes = Router();
routes.get("", ProductoController.getAll);
routes.get("/getById/:Codigo_producto", ProductoController.getById);
routes.post("", ProductoController.add);
routes.patch("/:Codigo_producto", ProductoController.update);
routes.delete("/:Codigo_producto", ProductoController.delete);
export default routes;
