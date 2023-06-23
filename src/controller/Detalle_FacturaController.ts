import { Request, Response } from "express";
import { AppDataSource } from "../data.-source";
import { Detalle_Factura } from "../entity/Detalle_Factura";
import { validate } from "class-validator";
import { Cliente } from "../entity/Cliente";

class Detalle_FacturaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repo = AppDataSource.getRepository(Detalle_Factura);
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
      const repo = AppDataSource.getRepository(Detalle_Factura);
      const Id_Detalle = parseInt(req.params["Id_Detalle"]);
      if (!Id_Detalle) {
        Id_Detalle;
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }
      let detalle;
      try {
        detalle = await repo.findOneOrFail({
          where: { Id_Detalle: Id_Detalle },
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontro" });
      }
      return resp.status(200).json({ detalle });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const { Id_Detalle, Numero, Cantidad, Codigo_producto } = req.body;
      let nuevo = new Detalle_Factura();
      nuevo.Id_Detalle = Id_Detalle;
      nuevo.Numero = Numero;
      nuevo.Cantidad = Cantidad;
      nuevo.producto = Codigo_producto;

      const errors = await validate(nuevo, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      const repo = AppDataSource.getRepository(Detalle_Factura);
      let exist = await repo.findOne({ where: { Id_Detalle } });
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
      const Id_Detalle = parseInt(req.params["Id_Detalle"]);
      const { Numero, Cantidad, Codigo_producto } = req.body;

      const repo = AppDataSource.getRepository(Detalle_Factura);
      const nuevo = await repo.findOne({ where: { Id_Detalle: Id_Detalle } });
      if (!nuevo) {
        return resp
          .status(400)
          .json({ mensaje: "No existe en la base de datos." });
      }

      nuevo.Numero = Numero;
      nuevo.Cantidad = Cantidad;
      nuevo.producto = Codigo_producto;

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
      const Id_Detalle = parseInt(req.params["Id_Detalle"]);
      const repo = AppDataSource.getRepository(Detalle_Factura);
      let detalle: Detalle_Factura;
      try {
        detalle = await repo.findOneOrFail({
          where: { Id_Detalle },
        });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se encontro" });
      }
      try {
        await repo.delete(detalle);
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

export default Detalle_FacturaController;
