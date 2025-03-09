import { Controller, Get, Param, Put, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile/:username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @UseGuards(AuthGuard())
  @Put('profile')
  updateProfile(@GetUser() user: User, @Body() updateData: UpdateUserDto) {
    return this.usersService.updateProfile(String(user.id), updateData);
  }
}
