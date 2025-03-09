import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DatabaseConfigService } from './config.service';
import configuration from './configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './sequelize-config.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      useClass: SequelizeConfigService,
      inject: [ConfigService],
    }),
  ],
  providers: [ConfigService, DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
