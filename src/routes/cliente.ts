import { Router } from "express";
import ClienteController from "../controller/ClienteController";


const routes = Router();

routes.get('',ClienteController.getAll);
routes.get('/getById/:cedula',ClienteController.getById);
export default routes;
