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

  @Column()
  @IsNotEmpty({ message: "Falta la fecha" })
  Fecha: Date;

  @ManyToOne(() => Cliente, { cascade: true })
  @JoinColumn({ name: "Ruc_cliente" })
  @IsNotEmpty({ message: "Falta el ID del Cliente" })
  cliente: Cliente;

  @ManyToOne(() => Vendedor, { cascade: true })
  @JoinColumn({ name: "Codigo_vendedor" })
  @IsNotEmpty({ message: "Falta el Codigo de vendedor" })
  vendedor: Vendedor;

  @OneToMany(() => Detalle_Factura, (detalle) => detalle.cabeceraFactura, {
    cascade: true,
  })
  detallesFactura: Detalle_Factura[];
}
