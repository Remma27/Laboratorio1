import { Request, Response } from "express";
import { Cabecera_Factura } from "../entity/Cabecera_Factura";
import { validate } from "class-validator";
import { AppDataSource } from "../data.-source";
import { Detalle_Factura } from "../entity/Detalle_Factura";

class FacturaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repoFact = AppDataSource.getRepository(Cabecera_Factura);
      let lista;
      try {
        lista = await repoFact.find({
          where: { Estado: true },
          relations: [
            "cliente",
            "vendedor",
            "detallesFactura",
            "detallesFactura.producto",
          ],
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontraron datos" });
      }
      if (lista.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontraron datos" });
      }

      return resp.status(200).json(lista);
    } catch (error) {
      resp.status(400).json({ mensaje: "Error al cargar datos" });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const Numero = parseInt(req.params["Numero"]);
      if (!Numero) {
        return resp.status(404).json({ mensaje: "No se indica el numero" });
      }
      const cabeceraRepo = AppDataSource.getRepository(Cabecera_Factura);
      let cabecera;
      try {
        cabecera = await cabeceraRepo.findOneOrFail({
          where: { Numero, Estado: true },
          relations: [
            "cliente",
            "vendedor",
            "detallesFactura",
            "detallesFactura.producto",
          ],
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro la factura con ese numero" });
      }
      return resp.status(200).json(cabecera);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  /* 
  Este es el formato que se tiene que utilizar:
  {
  "Numero": 8,
  "Fecha": "2023-06-25",
  "cliente": "1",
  "vendedor": "1",
  "Id_Detalle": 9,
  "Cantidad": 3,
  "Codigo_producto": "1"
}

  */
  static add = async (req: Request, resp: Response) => {
    try {
      const {
        Numero,
        Fecha,
        cliente,
        vendedor,
        Id_Detalle,
        Cantidad,
        Codigo_producto,
        Estado,
      } = req.body;

      const cabeceraRepo = AppDataSource.getRepository(Cabecera_Factura);
      const detalleRepo = AppDataSource.getRepository(Detalle_Factura);

      const factura = await cabeceraRepo.findOne({ where: { Numero } });
      if (factura) {
        return resp
          .status(404)
          .json({ mensaje: "La factura ya existe en la base de datos" });
      }

      const fecha = new Date(Fecha);
      let cabeceraFactura = new Cabecera_Factura();
      cabeceraFactura.Numero = Numero;
      cabeceraFactura.Fecha = fecha;
      cabeceraFactura.cliente = cliente;
      cabeceraFactura.vendedor = vendedor;
      cabeceraFactura.Estado = true;

      let detalleFactura = new Detalle_Factura();
      detalleFactura.Id_Detalle = Id_Detalle;
      detalleFactura.Cantidad = Cantidad;
      detalleFactura.producto = Codigo_producto;
      detalleFactura.cabeceraFactura = cabeceraFactura; // Asociar el detalle con la cabecera

      // Validar con class-validator
      const errorsCabecera = await validate(cabeceraFactura, {
        validationError: { target: false, value: false },
      });

      if (errorsCabecera.length > 0) {
        return resp.status(400).json(errorsCabecera);
      }

      // Validar con class-validator
      const errorsDetalle = await validate(detalleFactura, {
        validationError: { target: false, value: false },
      });

      if (errorsDetalle.length > 0) {
        return resp.status(400).json(errorsDetalle);
      }

      await cabeceraRepo.save(cabeceraFactura);
      await detalleRepo.save(detalleFactura);
      return resp.status(201).json({ mensaje: "Factura creada" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    try {
      const Numero = parseInt(req.params["Numero"]);
      const {
        Fecha,
        cliente,
        vendedor,
        Id_Detalle,
        Cantidad,
        Codigo_producto,
      } = req.body;

      const cabeceraRepo = AppDataSource.getRepository(Cabecera_Factura);
      const detalleRepo = AppDataSource.getRepository(Detalle_Factura);

      const cabeceraFactura = await cabeceraRepo.findOne({
        where: { Numero: Numero, Estado: true },
      });

      if (!cabeceraFactura) {
        return resp
          .status(404)
          .json({ mensaje: "La factura no existe en la base de datos" });
      }

      const fecha = new Date(Fecha);
      cabeceraFactura.Fecha = fecha;
      cabeceraFactura.cliente = cliente;
      cabeceraFactura.vendedor = vendedor;

      let detalleFactura = new Detalle_Factura();
      detalleFactura.Id_Detalle = Id_Detalle;
      detalleFactura.Cantidad = Cantidad;
      detalleFactura.producto = Codigo_producto;
      detalleFactura.cabeceraFactura = cabeceraFactura; // Asociar el detalle con la cabecera

      // Validar con class-validator
      const errorsCabecera = await validate(cabeceraFactura, {
        validationError: { target: false, value: false },
      });

      if (errorsCabecera.length > 0) {
        return resp.status(400).json(errorsCabecera);
      }

      // Validar con class-validator
      const errorsDetalle = await validate(detalleFactura, {
        validationError: { target: false, value: false },
      });

      if (errorsDetalle.length > 0) {
        return resp.status(400).json(errorsDetalle);
      }

      await cabeceraRepo.save(cabeceraFactura);
      await detalleRepo.save(detalleFactura);

      return resp.status(200).json({ mensaje: "Factura actualizada" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static delete = async (req: Request, resp: Response) => {
    try {
      const Numero = parseInt(req.params["Numero"]);
      if (!Numero) {
        return resp
          .status(404)
          .json({ mensaje: "No se indica el número de factura" });
      }

      const cabeceraRepo = AppDataSource.getRepository(Cabecera_Factura);
      const detalleRepo = AppDataSource.getRepository(Detalle_Factura);

      const cabecera = await cabeceraRepo.findOne({
        where: { Numero },
        relations: ["detallesFactura"],
      });

      if (!cabecera) {
        return resp.status(404).json({ mensaje: "No se encontró la factura" });
      }

      cabecera.Estado = false;
      await detalleRepo.save(cabecera.detallesFactura);
      await cabeceraRepo.save(cabecera);

      return resp.status(200).json({ mensaje: "Factura eliminada" });
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error al eliminar la factura" });
    }
  };
}

export default FacturaController;
