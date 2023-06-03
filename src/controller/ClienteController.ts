import { Request, Response } from "express";
import { AppDataSource } from "../data.-source";
import { Cliente } from "../entity/Cliente";

class ClienteControlller {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const clientesRepo = AppDataSource.getRepository(Cliente);
      const listaClientes = await clientesRepo.find({
        where: { estado: true },
      });
      if (listaClientes.length === 0) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontraron resultados." });
      }
      return resp.status(200).json({ listaClientes });
    } catch (error) {
      return resp.status(400).json({ mensaje: error.mensaje });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const clientesRepo = AppDataSource.getRepository(Cliente);
      const cedula = parseInt(req.params["cedula"]);
      if (!cedula) {
        return resp.status(404).json({ mensaje: "No se indica la cedula" });
      }
      let cliente;
      try {
        cliente = await clientesRepo.findOneOrFail({ where: { cedula } });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontró el cliente con esa cédula" });
      }
      return resp.status(200).json({ cliente });
    } catch (error) {
      return resp.status(500).json({ mensaje: error.message });
    }
  };
  
}

export default ClienteControlller;
