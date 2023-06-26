import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Cabecera_Factura } from "./Cabecera_Factura";
import { Producto } from "./Producto";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Detalle_Factura {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: "Falta el ID" })
  Id_Detalle: number;

  @ManyToOne(() => Cabecera_Factura, (cabecera) => cabecera.detallesFactura)
  @JoinColumn({ name: "Numero" })
  @IsNotEmpty({ message: "Falta el Numero" })
  cabeceraFactura: Cabecera_Factura;

  @Column()
  @IsNotEmpty({ message: "Falta la cantidad" })
  Cantidad: number;

  @ManyToOne(() => Producto, (producto) => producto.detallesFactura)
  @JoinColumn({ name: "Codigo_Producto" })
  @IsNotEmpty({ message: "Falta el codigo de producto" })
  producto: Producto;
}
