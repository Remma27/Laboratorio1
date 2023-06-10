import { Request, Response } from "express";

class ProveedorController {
  static getAll = async (req: Request, resp: Response) => {
    return resp.status(200).json({mensaje:'Ok'});
  };

  static getById = async (req: Request, resp: Response) => {
    return resp.status(200).json({mensaje:'Ok'});
  };
}

export default ProveedorController;
