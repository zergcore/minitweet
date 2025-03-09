import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    await user.update(updateData);
    return user;
  }
}
