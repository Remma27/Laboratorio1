import { Request, Response } from "express";
import { Cabecera_Factura } from "../entity/Cabecera_Factura";
import { validate } from "class-validator";
import { AppDataSource } from "../data.-source";
import { Detalle_Factura } from "../entity/Detalle_Factura";

class FacturaController {
  static crearFactura = async (req: Request, resp: Response) => {
    try {
      const {
        Numero,
        Ruc_cliente,
        Codigo_vendedor,
        Id_Detalle,
        Cantidad,
        Codigo_producto,
      } = req.body;

      let Cabecera = new Cabecera_Factura();
      Cabecera.Numero = Numero;
      let fecha = new Date();
      Cabecera.Fecha = fecha;
      Cabecera.cliente = Ruc_cliente;
      Cabecera.vendedor = Codigo_vendedor;

      let detalle = new Detalle_Factura();
      detalle.Id_Detalle = Id_Detalle;
      detalle.Numero = Numero;
      detalle.Cantidad = Cantidad;
      detalle.producto = Codigo_producto;

      const errors = await validate(Cabecera, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      const errors2 = await validate(detalle, {
        validationError: { target: false, value: false },
      });

      if (errors2.length > 0) {
        return resp.status(400).json(errors2);
      }

      const repoCabecera = AppDataSource.getRepository(Cabecera_Factura);
      const repoDetalle = AppDataSource.getRepository(Detalle_Factura);
      let exist = await repoCabecera.findOne({ where: { Numero } });
      if (exist) {
        return resp
          .status(400)
          .json({ mensaje: "Ya existe en la base de datos." });
      }

      try {
        await repoCabecera.save(Cabecera);
        await repoDetalle.save(detalle);
        return resp
          .status(201)
          .json({ mensaje: "Se ha creado la factura y su detalle" });
      } catch (error) {
        resp.status(400).json(error);
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static obtenerFactura = async (req: Request, resp: Response) => {
    try {
      const Numero = parseInt(req.params.Numero);

      const facturaRepository = AppDataSource.getRepository(Cabecera_Factura);
      const factura = await facturaRepository.findOne({
        where: { Numero },
        relations: ["detalles"],
      });

      if (!factura) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontró la factura especificada" });
      }

      return resp.status(200).json({ factura });
    } catch (error) {
      return resp.status(400).json({ mensaje: error.message });
    }
  };

  static modificarFactura = async (req: Request, resp: Response) => {
    try {
      const Numero = parseInt(req.params["Numero"]);
      const { Ruc_cliente, Codigo_vendedor, Cantidad, Codigo_producto } =
        req.body;

      const repoCabecera = AppDataSource.getRepository(Cabecera_Factura);
      const repoDetalle = AppDataSource.getRepository(Detalle_Factura);

      const factura = await repoCabecera.findOne({ where: { Numero: Numero } });
      if (!factura) {
        return resp
          .status(400)
          .json({ mensaje: "No existe en la base de datos." });
      }

      let fecha = new Date();
      factura.Fecha = fecha;
      factura.cliente = Ruc_cliente;
      factura.vendedor = Codigo_vendedor;

      const errors = await validate(factura, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      let detalle = new Detalle_Factura();
      detalle.Cantidad = Cantidad;
      detalle.producto = Codigo_producto;
      detalle.cabecera = factura;

      const errors2 = await validate(detalle, {
        validationError: { target: false, value: false },
      });

      if (errors2.length > 0) {
        return resp.status(400).json(errors2);
      }

      try {
        await repoDetalle.save(detalle);
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
}

export default FacturaController;
