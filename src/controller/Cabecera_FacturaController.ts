import { Request, Response } from "express";
import { AppDataSource } from "../data.-source";
import { Cabecera_Factura } from "../entity/Cabecera_Factura";
import { validate } from "class-validator";

class Cabecera_FacturaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repo = AppDataSource.getRepository(Cabecera_Factura);
      const lista = await repo.find();
      if (lista.length === 0) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontraron resultados." });
      }
      return resp.status(200).json({ lista });
    } catch (error) {
      return resp.status(400).json({ mensaje: error.message });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const repo = AppDataSource.getRepository(Cabecera_Factura);
      const Numero = parseInt(req.params["Numero"]);
      if (!Numero) {
        Numero;
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }
      let cabecera_Factura;
      try {
        cabecera_Factura = await repo.findOneOrFail({ where: { Numero } });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontro" });
      }
      return resp.status(200).json({ cabecera_Factura });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const { Numero, Fecha, Ruc_cliente, Codigo_vendedor } = req.body;
      let fecha = new Date();
      let nuevo = new Cabecera_Factura();
      nuevo.Numero = Numero;
      nuevo.Fecha = fecha;
      nuevo.cliente = Ruc_cliente;
      nuevo.vendedor = Codigo_vendedor;

      const errors = await validate(nuevo, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      const repo = AppDataSource.getRepository(Cabecera_Factura);
      let exist = await repo.findOne({ where: { Numero } });
      if (exist) {
        return resp
          .status(400)
          .json({ mensaje: "Ya existe en la base de datos." });
      }

      try {
        await repo.save(nuevo);
        return resp.status(201).json({ mensaje: "Se ha creado" });
      } catch (error) {
        resp.status(400).json(error);
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    try {
      const Numero = parseInt(req.params["Numero"]);
      const { Ruc_cliente, Codigo_vendedor } = req.body;

      const repo = AppDataSource.getRepository(Cabecera_Factura);
      const nuevo = await repo.findOne({ where: { Numero: Numero } });
      if (!nuevo) {
        return resp
          .status(400)
          .json({ mensaje: "No existe en la base de datos." });
      }

      let fecha = new Date();
      nuevo.Fecha = fecha;
      nuevo.cliente = Ruc_cliente;
      nuevo.vendedor = Codigo_vendedor;

      const errors = await validate(nuevo, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      try {
        await repo.save(nuevo);
        return resp
          .status(201)
          .json({ mensaje: "Se ha guardado correctamente" });
      } catch (error) {
        resp.status(400).json(error);
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static delete = async (req: Request, resp: Response) => {
    try {
      const Numero = parseInt(req.params["Numero"]);
      const repo = AppDataSource.getRepository(Cabecera_Factura);
      let Cabecera: Cabecera_Factura;
      try {
        Cabecera = await repo.findOneOrFail({ where: { Numero: Numero } });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se encontro" });
      }
      try {
        await repo.save(Cabecera);
        return resp
          .status(200)
          .json({ mensaje: "Se a eliminado correctamente" });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se pudo eliminar" });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "No se pudo eliminar" });
    }
  };
}

export default Cabecera_FacturaController;
