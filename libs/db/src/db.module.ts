import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService, IDbConfig } from '@dev/config';
import { DbService } from './db.service';
export interface DbConfig {
  entities: DataSourceOptions['entities'];
}

@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {
  private static getConnectionOptions(
    config: ConfigService,
    dbConfig: DbConfig,
  ): DataSourceOptions {
    const dbData = config._.db;
    if (!dbData) {
      throw Error('');
    }
    const connectionOptions = this.getConnectionOptionsPostgres(dbData);
    return {
      ...connectionOptions,
      entities: dbConfig.entities,
      synchronize: true,
      logging: true,
    };
  }

  private static getConnectionOptionsPostgres(
    dbData: IDbConfig,
  ): any {
    return {
      ...dbData,
    };
  }

  public static forRoot(dbConfig: DbConfig) {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            return DbModule.getConnectionOptions(configService, dbConfig);
          },
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
