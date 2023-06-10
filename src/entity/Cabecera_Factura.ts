import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Cliente } from "./Cliente";
import { Vendedor } from "./Vendedor";
import { Detalle_Factura } from "./Detalle_Factura";


@Entity()
export class Cabecera_Factura {
    @PrimaryGeneratedColumn()
    Numero: number;

    @OneToMany(() => Detalle_Factura, detalle => detalle.cabecera)
    detalles: Detalle_Factura[];


    @Column()
    Fecha: Date;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: "Ruc_cliente" })
    cliente: Cliente;

    @ManyToOne(() => Vendedor)
    @JoinColumn({ name: "Codigo_vendedor" })
    vendedor: Vendedor;
}

