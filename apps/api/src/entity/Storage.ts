import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Storage{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    state: string

    @Column()
    city: string

    @Column()
    street: string

    @Column()
    number: string
    
}