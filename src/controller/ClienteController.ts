import { Request, Response } from "express";
import { AppDataSource } from "../data.-source";
import { Cliente } from "../entity/Cliente";
import { validate } from "class-validator";

class ClienteControlller {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repo = AppDataSource.getRepository(Cliente);
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
      const repo = AppDataSource.getRepository(Cliente);
      const Ruc_cliente = parseInt(req.params["Ruc_cliente"]);
      if (!Ruc_cliente) {
        Ruc_cliente;
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }
      let cliente;
      try {
        cliente = await repo.findOneOrFail({ where: { Ruc_cliente } });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontro" });
      }
      return resp.status(200).json({ cliente });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const {
        Ruc_cliente,
        Nombres_cliente,
        Apellidos_cliente,
        Direccion_cliente,
        Telefono_cliente,
      } = req.body;
      let nuevo = new Cliente();
      nuevo.Ruc_cliente = Ruc_cliente;
      nuevo.Nombres_cliente = Nombres_cliente;
      nuevo.Apellidos_cliente = Apellidos_cliente;
      nuevo.Direccion_cliente = Direccion_cliente;
      nuevo.Telefono_cliente = Telefono_cliente;

      const errors = await validate(nuevo, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      const repo = AppDataSource.getRepository(Cliente);
      let exist = await repo.findOne({ where: { Ruc_cliente } });
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
      const Ruc_cliente = parseInt(req.params["Ruc_Cliente"]);
      const {
        Nombres_cliente,
        Apellidos_cliente,
        Direccion_cliente,
        Telefono_cliente,
      } = req.body;

      const repo = AppDataSource.getRepository(Cliente);
      const nuevo = await repo.findOne({ where: { Ruc_cliente: Ruc_cliente } });
      if (!nuevo) {
        return resp
          .status(400)
          .json({ mensaje: "No existe en la base de datos." });
      }

      nuevo.Nombres_cliente = Nombres_cliente;
      nuevo.Apellidos_cliente = Apellidos_cliente;
      nuevo.Direccion_cliente = Direccion_cliente;
      nuevo.Telefono_cliente = Telefono_cliente;

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
      const Ruc_cliente = parseInt(req.params["Ruc_Cliente"]);
      const repo = AppDataSource.getRepository(Cliente);
      let cliente: Cliente;
      try {
        cliente = await repo.findOneOrFail({
          where: { Ruc_cliente },
        });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se encontro" });
      }
      try {
        await repo.remove(cliente);
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

export default ClienteControlller;
