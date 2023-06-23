import { Router } from "express";
import Cabecera_FacturaController from "../controller/Cabecera_FacturaController";
const routes = Router();
routes.get("", Cabecera_FacturaController.getAll);
routes.get("/getById/:Numero", Cabecera_FacturaController.getById);
routes.post("", Cabecera_FacturaController.add);
routes.patch("/:Numero", Cabecera_FacturaController.update);
routes.delete("/:Numero", Cabecera_FacturaController.delete);
export default routes;
