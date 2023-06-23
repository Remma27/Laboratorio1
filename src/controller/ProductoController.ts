import { Request, Response } from "express";
import { Producto } from "../entity/Producto";
import { AppDataSource } from "../data.-source";
import { validate } from "class-validator";

class ProductoController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repo = AppDataSource.getRepository(Producto);
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
      const repo = AppDataSource.getRepository(Producto);
      const Codigo_producto = parseInt(req.params["Codigo_producto"]);
      if (!Codigo_producto) {
        Codigo_producto;
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }
      let produto;
      try {
        produto = await repo.findOneOrFail({
          where: { Codigo_producto: Codigo_producto },
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontro" });
      }
      return resp.status(200).json({ produto });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const {
        Codigo_producto,
        Descripcion_producto,
        Precio_producto,
        Stock_maximo_producto,
        Stock_minimo_producto,
        Codigo_proveedor,
      } = req.body;

      let nuevo = new Producto();
      nuevo.Codigo_producto = Codigo_producto;
      nuevo.Descripcion_producto = Descripcion_producto;
      nuevo.Precio_producto = Precio_producto;
      nuevo.Stock_maximo_producto = Stock_maximo_producto;
      nuevo.Stock_minimo_producto = Stock_minimo_producto;
      nuevo.proveedor = Codigo_proveedor;

      const errors = await validate(nuevo, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      const repo = AppDataSource.getRepository(Producto);
      let exist = await repo.findOne({ where: { Codigo_producto } });
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
      const Codigo_producto = parseInt(req.params["Codigo_producto"]);
      const {
        Descripcion_producto,
        Precio_producto,
        Stock_maximo_producto,
        Stock_minimo_producto,
        Codigo_proveedor,
      } = req.body;

      const repo = AppDataSource.getRepository(Producto);
      const nuevo = await repo.findOne({
        where: { Codigo_producto: Codigo_producto },
      });
      if (!nuevo) {
        return resp
          .status(400)
          .json({ mensaje: "No existe en la base de datos." });
      }

      nuevo.Descripcion_producto = Descripcion_producto;
      nuevo.Precio_producto = Precio_producto;
      nuevo.Stock_maximo_producto = Stock_maximo_producto;
      nuevo.Stock_minimo_producto = Stock_minimo_producto;
      nuevo.proveedor = Codigo_proveedor;

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
      const Codigo_producto = parseInt(req.params["Codigo_producto"]);
      const repo = AppDataSource.getRepository(Producto);
      let produto: Producto;
      try {
        produto = await repo.findOneOrFail({
          where: { Codigo_producto },
        });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se encontro" });
      }
      try {
        await repo.delete(produto);
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

export default ProductoController;
