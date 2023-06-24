import { Request, Response } from "express";
import { Vendedor } from "../entity/Vendedor";
import { AppDataSource } from "../data.-source";
import { validate } from "class-validator";

class VendedorControlller {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repo = AppDataSource.getRepository(Vendedor);
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
      const repo = AppDataSource.getRepository(Vendedor);
      const Codigo_Vendedor = parseInt(req.params["Codigo_Vendedor"]);
      if (!Codigo_Vendedor) {
        Codigo_Vendedor;
        return resp.status(404).json({ mensaje: "No se indica el codigo" });
      }
      let vendedor;
      try {
        vendedor = await repo.findOneOrFail({
          where: { Codigo_Vendedor: Codigo_Vendedor },
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontro" });
      }
      return resp.status(200).json({ vendedor });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const {
        Codigo_Vendedor,
        Nombres_vendedor,
        Apellidos_vendedor,
        Direccion_vendedor,
        Telefono_vendedor,
        Celular_vendedor,
      } = req.body;

      let nuevo = new Vendedor();
      nuevo.Codigo_Vendedor = Codigo_Vendedor;
      nuevo.Nombres_vendedor = Nombres_vendedor;
      nuevo.Apellidos_vendedor = Apellidos_vendedor;
      nuevo.Direccion_vendedor = Direccion_vendedor;
      nuevo.Telefono_vendedor = Telefono_vendedor;
      nuevo.Celular_vendedor = Celular_vendedor;

      const errors = await validate(nuevo, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      const repo = AppDataSource.getRepository(Vendedor);
      let exist = await repo.findOne({ where: { Codigo_Vendedor } });
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
      const Codigo_Vendedor = parseInt(req.params["Codigo_Vendedor"]);
      const {
        Nombres_vendedor,
        Apellidos_vendedor,
        Direccion_vendedor,
        Telefono_vendedor,
        Celular_vendedor,
      } = req.body;

      const repo = AppDataSource.getRepository(Vendedor);
      const nuevo = await repo.findOne({
        where: { Codigo_Vendedor: Codigo_Vendedor },
      });
      if (!nuevo) {
        return resp
          .status(400)
          .json({ mensaje: "No existe en la base de datos." });
      }

      nuevo.Nombres_vendedor = Nombres_vendedor;
      nuevo.Apellidos_vendedor = Apellidos_vendedor;
      nuevo.Direccion_vendedor = Direccion_vendedor;
      nuevo.Telefono_vendedor = Telefono_vendedor;
      nuevo.Celular_vendedor = Celular_vendedor;

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
      const Codigo_Vendedor = parseInt(req.params["Codigo_Vendedor"]);
      const repo = AppDataSource.getRepository(Vendedor);
      let vendedor: Vendedor;
      try {
        vendedor = await repo.findOneOrFail({
          where: { Codigo_Vendedor },
        });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se encontro" });
      }
      try {
        await repo.delete(vendedor);
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

export default VendedorControlller;
