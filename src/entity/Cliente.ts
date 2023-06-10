import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Vendedor } from "./Vendedor";

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    Ruc_cliente: number

    @OneToMany(() => Vendedor, vendedor => vendedor.cliente)
    vendedores: Vendedor[];
    
    @Column()
    Nombres_cliente: string

    @Column()
    Apellidos_cliente: string

    @Column()
    Direccion_cliente: string

    @Column()
    Telefono_cliente: number

}