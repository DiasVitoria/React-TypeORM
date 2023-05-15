import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"teams"}) 
export class Teams {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 30})
    name: string
}