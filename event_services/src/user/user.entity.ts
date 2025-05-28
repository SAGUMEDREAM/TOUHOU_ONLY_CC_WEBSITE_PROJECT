import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public password: string;

    @Column()
    public token: string;

}