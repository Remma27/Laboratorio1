import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cabecera_Factura } from "./Cabecera_Factura";
import { Producto } from "./Producto";



@Entity()
export class Detalle_Factura {
    @PrimaryGeneratedColumn()
    Numero: number;

    @Column()
    Cantidad: number;

    @ManyToOne(() => Cabecera_Factura)
    @JoinColumn({ name: "Numero" })
    cabecera: Cabecera_Factura;

    @ManyToOne(() => Producto)
    @JoinColumn({ name: "Codigo_Producto" })
    producto: Producto;
}


