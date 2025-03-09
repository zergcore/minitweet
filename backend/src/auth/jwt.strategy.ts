/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new InternalServerErrorException(
        'JWT_SECRET is not defined in configuration',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: number }) {
    if (!payload?.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.userModel.findOne({
      where: {
        id: payload.sub,
        isActive: true,
      },
      attributes: ['id', 'email'], // Evita devolver información sensible
    });

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user; // Solo los atributos necesarios
  }
}
