import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Producto } from "./Producto";

@Entity()
export class Proveedor {

    @PrimaryGeneratedColumn()
    Codigo_proveedor: number

    @OneToMany(() => Producto, producto => producto.proveedor)
    productos: Producto[];

    @Column()
    Nombres_proveedor: string

    @Column()
    Apellidos_proveedor: string

    @Column()
    Direccion_proveedor: string

    @Column()
    Provincia_proveedor: string

    @Column()
    Telefono_vendedor: number
}
