import {Module} from '@nestjs/common';
import {TableController} from './table.controller';
import {TableService} from './table.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Table, Cell, Row, ColumnDefinition} from "./table.entity";
import {User} from "../user/user.entity";
import { UserModule } from '../user/user.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Table, Row, Cell, ColumnDefinition]),
        UserModule
    ],
    controllers: [TableController],
    providers: [TableService]
})
export class TableModule {
}
