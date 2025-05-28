import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user/user.entity";
import { TableModule } from './table/table.module';

@Module({
    imports: [
        UserModule,
        TableModule,
        TypeOrmModule.forRoot({
            type: "sqlite",
            database: "db.sqlite",
            entities: [User],
            synchronize: true
        }),
        TableModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
