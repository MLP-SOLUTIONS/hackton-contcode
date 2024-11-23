import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Storage } from "./Storage";

@Entity()
export class Control{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @ManyToOne(()=>User, (user)=> user.controls)
    user: User

    @ManyToOne(()=>Storage, (storage)=> storage.controls)
    storage: Storage
    
}