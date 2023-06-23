import { Request, Response } from "express";
import { Proveedor } from "../entity/Proveedor";
import { AppDataSource } from "../data.-source";
import { validate } from "class-validator";

class ProveedorController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repo = AppDataSource.getRepository(Proveedor);
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
      const repo = AppDataSource.getRepository(Proveedor);
      const Codigo_proveedor = parseInt(req.params["Codigo_proveedor"]);
      if (!Codigo_proveedor) {
        Codigo_proveedor;
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }
      let proveedor;
      try {
        proveedor = await repo.findOneOrFail({
          where: { Codigo_proveedor: Codigo_proveedor },
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontro" });
      }
      return resp.status(200).json({ proveedor });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const {
        Codigo_proveedor,
        productos,
        Nombres_proveedor,
        Apellidos_proveedor,
        Direccion_proveedor,
        Provincia_proveedor,
        Telefono_proveedor,
      } = req.body;

      let nuevo = new Proveedor();
      nuevo.Codigo_proveedor = Codigo_proveedor;
      nuevo.productos = productos;
      nuevo.Nombres_proveedor = Nombres_proveedor;
      nuevo.Apellidos_proveedor = Apellidos_proveedor;
      nuevo.Direccion_proveedor = Direccion_proveedor;
      nuevo.Provincia_proveedor = Provincia_proveedor;
      nuevo.Telefono_proveedor = Telefono_proveedor;

      const errors = await validate(nuevo, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      const repo = AppDataSource.getRepository(Proveedor);
      let exist = await repo.findOne({ where: { Codigo_proveedor } });
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
      const Codigo_proveedor = parseInt(req.params["Codigo_proveedor"]);
      const {
        productos,
        Nombres_proveedor,
        Apellidos_proveedor,
        Direccion_proveedor,
        Provincia_proveedor,
        Telefono_proveedor,
      } = req.body;

      const repo = AppDataSource.getRepository(Proveedor);
      const nuevo = await repo.findOne({
        where: { Codigo_proveedor: Codigo_proveedor },
      });
      if (!nuevo) {
        return resp
          .status(400)
          .json({ mensaje: "No existe en la base de datos." });
      }

      nuevo.productos = productos;
      nuevo.Nombres_proveedor = Nombres_proveedor;
      nuevo.Apellidos_proveedor = Apellidos_proveedor;
      nuevo.Direccion_proveedor = Direccion_proveedor;
      nuevo.Provincia_proveedor = Provincia_proveedor;
      nuevo.Telefono_proveedor = Telefono_proveedor;

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
      const Codigo_proveedor = parseInt(req.params["Codigo_proveedor"]);
      const repo = AppDataSource.getRepository(Proveedor);
      let provedoor: Proveedor;
      try {
        provedoor = await repo.findOneOrFail({
          where: { Codigo_proveedor },
        });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se encontro" });
      }
      try {
        await repo.delete(provedoor);
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

export default ProveedorController;
