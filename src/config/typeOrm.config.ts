import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmCongif: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres12',
    database: 'cryptBank',
    autoLoadEntities: true,
    synchronize: true
}