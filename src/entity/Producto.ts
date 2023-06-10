import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Proveedor } from "./Proveedor";
import { Detalle_Factura } from "./Detalle_Factura";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    Codigo_producto: number;
    @OneToMany(() => Detalle_Factura, detalle => detalle.producto)
    detalles: Detalle_Factura[];


    @Column()
    Descripcion_producto: string;

    @Column()
    Precio_producto: number;

    @Column()
    Stock_maximo_producto: number;

    @Column()
    Stock_minimo_producto: number;

    @ManyToOne(() => Proveedor)
    @JoinColumn({ name: "Codigo_proveedor" })
    proveedor: Proveedor;
}

