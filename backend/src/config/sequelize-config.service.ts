import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'mysql',
      host: this.configService.get('mysql.host'),
      port: this.configService.get('mysql.port'),
      username: this.configService.get('mysql.username'),
      password: this.configService.get('mysql.password'),
      database: this.configService.get('mysql.database'),
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    };
  }
}
