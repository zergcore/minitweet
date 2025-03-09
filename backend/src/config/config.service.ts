import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('mysql.host') ?? '';
  }
  get port(): number {
    return this.configService.get<number>('mysql.port') ?? 3306;
  }
  get username(): string {
    return this.configService.get<string>('mysql.username') ?? '';
  }
  get password(): string {
    return this.configService.get<string>('mysql.password') ?? '';
  }

  get database(): string {
    return this.configService.get<string>('mysql.database') ?? '';
  }
}
