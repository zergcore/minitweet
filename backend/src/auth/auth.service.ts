import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { username, email, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      where: {
        username,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const existingEmail = await this.userModel.findOne({
      where: {
        email,
      },
    });

    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = this.generateToken(newUser);

    // Attach token to user model virtual field
    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      token: token,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userModel.findOne({
      where: {
        email,
      },
      attributes: ['id', 'username', 'email', 'password', 'isActive'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    const userPassword = user.getDataValue('password');

    if (!userPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, userPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      token: token,
    };
  }

  private generateToken(user: User): string {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    const token = this.jwtService.sign(payload);
    if (!token) {
      throw new UnauthorizedException('Failed to generate token');
    }
    return token;
  }
}
