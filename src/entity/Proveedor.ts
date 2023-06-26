import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Producto } from "./Producto";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: "Falta el codigo del proveedor" })
  Codigo_proveedor: number;

  @Column()
  @IsNotEmpty({ message: "Falta el nombre del proveedor" })
  Nombres_proveedor: string;

  @Column()
  @IsNotEmpty({ message: "Falta el apellido del proveedor" })
  Apellidos_proveedor: string;

  @Column()
  @IsNotEmpty({ message: "Falta la direccion del proveedor" })
  Direccion_proveedor: string;

  @Column()
  @IsNotEmpty({ message: "Falta la provincia del proveedor" })
  Provincia_proveedor: string;

  @Column()
  @IsNotEmpty({ message: "Falta el telefono del proveedor" })
  Telefono_proveedor: number;

  @OneToMany(() => Producto, (producto) => producto.proveedor)
  productos: Producto[];
}
