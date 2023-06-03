import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    cedula: number

    @Column()
    nombre: string

    @Column()
    apellido1: string

    @Column()
    apellido2: string

    @Column({type:'date'})
    fechaNacimiento: Date

    @Column({type:'enum',enum:['M','F','I']})
    genero: string

    @Column({ type: 'boolean', default: true })
    estado: boolean

}
