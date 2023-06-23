import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Cliente } from "./Cliente";
import { Vendedor } from "./Vendedor";
import { Detalle_Factura } from "./Detalle_Factura";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Cabecera_Factura {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: "Falta el Numero" })
  Numero: number;

  @OneToMany(() => Detalle_Factura, (detalle) => detalle.cabecera)
  detalles: Detalle_Factura[];

  @Column()
  @IsNotEmpty({ message: "Falta la fecha" })
  Fecha: Date;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: "Ruc_cliente" })
  @IsNotEmpty({ message: "Falta el ID del Cliente" })
  cliente: Cliente;

  @ManyToOne(() => Vendedor)
  @JoinColumn({ name: "Codigo_vendedor" })
  @IsNotEmpty({ message: "Falta el Codigo de vendedor" })
  vendedor: Vendedor;
}
