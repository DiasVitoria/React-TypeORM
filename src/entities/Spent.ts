import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Teams } from "./Teams";

@Entity({ name: "matches" })
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, type: 'date',default: () => 'CURRENT_TIMESTAMP'})
    date: Date;

    @ManyToOne((type) => Teams, {onDelete: 'CASCADE'})
    @JoinColumn({name:'idHost', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_host_id' })
    host: Teams;

    @ManyToOne((type) => Teams, {onDelete: 'CASCADE'})
    @JoinColumn({name:'idVisitor', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_visitor_id' })
    visitor: Teams;

}