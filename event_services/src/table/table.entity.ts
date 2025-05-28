import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Table {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Row, row => row.table, {cascade: true})
    rows: Row[];

    @OneToMany(() => ColumnDefinition, (col) => col.table, { cascade: true })
    columns: ColumnDefinition[]

}

@Entity()
export class Row {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Table, table => table.rows)
    table: Table;

    @OneToMany(() => Cell, cell => cell.row, {cascade: true})
    cells: Cell[];
}

@Entity()
export class Cell {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Row, row => row.cells)
    row: Row;

    @Column()
    columnKey: string;

    @Column('text')
    value: string;

    @Column({default: 'string'})
    type: 'string' | 'number' | 'date' | 'bool' | 'formula';
}

@Entity()
export class ColumnDefinition {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    columnKey: string

    @Column({ default: 'string' })
    type: 'string' | 'number' | 'date' | 'bool' | 'formula'

    @ManyToOne(() => Table, (table) => table.columns)
    table: Table
}
