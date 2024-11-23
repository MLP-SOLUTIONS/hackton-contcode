import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Control } from "./Control";

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

    @OneToMany(()=>Control, (control)=> control.storage)
    controls: Control[]
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            state: this.state,
            city: this.city,
            street: this.street,
            number: this.number
        }
    }
}