import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vendedor } from "./Vendedor";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: "Falta el Numero" })
  Ruc_cliente: number;

  @OneToMany(() => Vendedor, (vendedor) => vendedor.cliente)
  vendedores: Vendedor[];

  @Column()
  @IsNotEmpty({ message: "Falta el nombre" })
  Nombres_cliente: string;

  @Column()
  @IsNotEmpty({ message: "Faltan los apellidos" })
  Apellidos_cliente: string;

  @Column()
  @IsNotEmpty({ message: "Falta la direccion" })
  Direccion_cliente: string;

  @Column()
  @IsNotEmpty({ message: "Falta el numero" })
  Telefono_cliente: number;
}
