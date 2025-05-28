import {Controller, Get, Post, Param, Body, Put, UseGuards, Query} from '@nestjs/common'
import {TableService} from './table.service'
import {UserService} from "../user/user.service";
import {TableAuthGuard} from "./table.auth_guard";

@Controller('tables')
export class TableController {
    constructor(
        private readonly tableService: TableService,
        private readonly userService: UserService
    ) {
    }

    @UseGuards(TableAuthGuard)
    @Post()
    async createTable(@Body('name') name: string) {
        return await this.tableService.createTable(name)
    }

    @Get(':id')
    async getTable(@Param('id') id: number) {
        return await this.tableService.getTable(id)
    }

    @Get(':id/sort')
    async sortTable(
        @Param('id') id: number,
        @Query('sortColumn') sortColumn: string,
        @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc' // 默认按升序排序
    ) {
        return await this.tableService.sortTable(id, sortColumn, sortOrder);
    }

    @UseGuards(TableAuthGuard)
    @Post(':id/rows')
    async addRow(@Param('id') id: number, @Body() body: any) {
        return await this.tableService.addRow(id, body.cells)
    }

    @UseGuards(TableAuthGuard)
    @Put('/cells/:cellId')
    async updateCell(@Param('cellId') cellId: number, @Body('value') value: string) {
        return await this.tableService.updateCell(cellId, value)
    }

    @UseGuards(TableAuthGuard)
    @Post(':id/collect')
    collectFormData(@Param('id') id: number, @Body() formData: Record<string, any>) {
        return this.tableService.collectFormData(id, formData);
    }
}
