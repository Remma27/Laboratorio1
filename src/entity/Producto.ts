import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Proveedor } from "./Proveedor";
import { Detalle_Factura } from "./Detalle_Factura";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: "Falta el codigo" })
  Codigo_producto: number;

  @OneToMany(() => Detalle_Factura, (detalle) => detalle.producto)
  detalles: Detalle_Factura[];

  @Column()
  @IsNotEmpty({ message: "Falta la descripcion" })
  Descripcion_producto: string;

  @Column()
  @IsNotEmpty({ message: "Falta el precio" })
  Precio_producto: number;

  @Column()
  @IsNotEmpty({ message: "Falta el stock maximo" })
  Stock_maximo_producto: number;

  @Column()
  @IsNotEmpty({ message: "Falta el stock minimo" })
  Stock_minimo_producto: number;

  @ManyToOne(() => Proveedor)
  @JoinColumn({ name: "Codigo_proveedor" })
  @IsNotEmpty({ message: "Falta el codigo del proveedor" })
  proveedor: Proveedor;
}
