import { Router } from "express";
import FacturaController from "../controller/FacturaController";
const routes = Router();
routes.get("", FacturaController.getAll);
routes.get("/getById/:Numero", FacturaController.getById);
routes.post("", FacturaController.add);
routes.patch("/:Numero", FacturaController.update);
routes.delete("/:Numero", FacturaController.delete);
export default routes;
