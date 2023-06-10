import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class Vendedor {
    [x: string]: any

    @PrimaryGeneratedColumn()
    Codigo_Vendedor: number

    @Column()
    Nombres_vendedor: string

    @Column()
    Apellidos_vendedor: string

    @Column()
    Direccion_vendedor: string

    @Column()
    Telefono_vendedor: number

    @Column()
    Celular_vendedor: number
}
