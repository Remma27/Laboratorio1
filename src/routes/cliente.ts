import { Router } from "express";
import ClienteController from "../controller/ClienteController";


const routes = Router();

routes.get('',ClienteController.getAll);
export default routes;
