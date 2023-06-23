import { Router } from "express";
import Detalle_FacturaController from "../controller/Detalle_FacturaController";
const routes = Router();
routes.get("", Detalle_FacturaController.getAll);
routes.get("/getById/:Id_Detalle", Detalle_FacturaController.getById);
routes.post("", Detalle_FacturaController.add);
routes.patch("/:Id_Detalle", Detalle_FacturaController.update);
routes.delete("/:Id_Detalle", Detalle_FacturaController.delete);
export default routes;
