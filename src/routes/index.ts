import { Router } from "express";
import cliente from "./cliente";

const routes = Router();

routes.use("/Cliente", cliente);

export default routes;
