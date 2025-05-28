import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {Table, Cell, Row, ColumnDefinition} from "./table.entity";
import {InjectRepository} from "@nestjs/typeorm";

interface CellInput {
    columnKey: string
    value: string
    type?: 'string' | 'number' | 'date' | 'bool' | 'formula'
}

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(Table) private tableRepo: Repository<Table>,
        @InjectRepository(Row) private rowRepo: Repository<Row>,
        @InjectRepository(Cell) private cellRepo: Repository<Cell>,
        @InjectRepository(ColumnDefinition) private columnRepo: Repository<ColumnDefinition>,
    ) {}

    async createTable(name: string): Promise<Table> {
        const table = this.tableRepo.create({ name })
        return this.tableRepo.save(table)
    }

    async getTable(id: number): Promise<Table> {
        const table = await this.tableRepo.findOne({
            where: { id },
            relations: ['rows', 'rows.cells', 'columns'],
        })
        if (!table) throw new Error('Table not found')
        return table
    }

    async addRow(tableId: number, cells: CellInput[]) {
        const table = await this.tableRepo.findOne({
            where: { id: tableId },
            relations: ['columns'],
        })
        if (!table) throw new Error('Table not found')

        const existingKeys = new Set(table.columns.map(c => c.columnKey))

        for (const cell of cells) {
            if (!existingKeys.has(cell.columnKey)) {
                const newCol = this.columnRepo.create({
                    columnKey: cell.columnKey,
                    type: cell.type ?? 'string',
                    table,
                })
                await this.columnRepo.save(newCol)
                existingKeys.add(cell.columnKey)
            }
        }

        const row = this.rowRepo.create({ table })
        row.cells = cells.map((c) =>
            this.cellRepo.create({
                columnKey: c.columnKey,
                value: c.value,
                type: c.type ?? 'string',
            })
        )
        return this.rowRepo.save(row)
    }

    async collectFormData(tableId: number, formData: Record<string, any>) {
        const table = await this.tableRepo.findOneBy({ id: tableId });
        if (!table) throw new Error('Table not found');

        const row = this.rowRepo.create({ table });

        row.cells = Object.entries(formData).map(([columnKey, value]) =>
            this.cellRepo.create({
                columnKey,
                value: String(value),
                type: typeof value === 'number' ? 'number' : 'string',
            }),
        );

        return this.rowRepo.save(row);
    }

    async updateCell(cellId: number, value: string) {
        const cell = await this.cellRepo.findOneBy({ id: cellId })
        if (!cell) throw new Error('Cell not found')
        cell.value = value
        return this.cellRepo.save(cell)
    }

    async sortTable(id: number, sortColumn: string, sortOrder: 'asc' | 'desc') {
        const table = await this.tableRepo.findOne({
            where: { id },
            relations: ['rows', 'rows.cells'],
        });
        if (!table) throw new Error('Table not found');

        // 获取列的索引
        const columnIndex = table.rows[0]?.cells.findIndex(
            (cell) => cell.columnKey === sortColumn
        );
        if (columnIndex === undefined || columnIndex === -1) {
            throw new Error(`Column ${sortColumn} not found`);
        }
        
        table.rows.sort((rowA, rowB) => {
            const cellA = rowA.cells[columnIndex];
            const cellB = rowB.cells[columnIndex];

            let valueA: string | number = cellA ? cellA.value : '';
            let valueB: string | number = cellB ? cellB.value : '';

            if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
                valueA = Number(valueA);
                valueB = Number(valueB);
            }

            if (sortOrder === 'asc') {
                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            } else {
                return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
            }
        });

        return table;
    }
}