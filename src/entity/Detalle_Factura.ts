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

  @Column()
  @IsNotEmpty({ message: "Falta el Numero" })
  Numero: number;

  @Column()
  @IsNotEmpty({ message: "Falta la cantidad" })
  Cantidad: number;

  @ManyToOne(() => Cabecera_Factura, (cabecera) => cabecera.detalles, {
    cascade: true,
  })
  @JoinColumn({ name: "Numero" })
  cabecera: Cabecera_Factura;

  @ManyToOne(() => Producto, { cascade: true })
  @JoinColumn({ name: "Codigo_Producto" })
  @IsNotEmpty({ message: "Falta el codigo de producto" })
  producto: Producto;
}
