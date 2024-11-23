import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Control } from "./Control"

enum Role{
    DRIVER="driver",
    ADMIN="admin"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({nullable: true})
    carPlate?: string

    @Column({
        type: "enum",
        enum: Role
    })
    role: Role

    @OneToMany(()=>Control, (control)=> control.user)
    controls: Control[]

    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            carPlate: this.carPlate,
            role: this.role
        }
    }
}
