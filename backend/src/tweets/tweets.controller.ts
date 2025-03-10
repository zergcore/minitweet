import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TweetsService } from './tweets.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Get()
  findAll() {
    return this.tweetsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.tweetsService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tweetsService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Post()
  create(@GetUser() user: User, @Body() createTweetDto: CreateTweetDto) {
    return this.tweetsService.create(user.id, createTweetDto);
  }

  @UseGuards(AuthGuard())
  @Put(':id')
  update(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateTweetDto: CreateTweetDto,
  ) {
    console.log(updateTweetDto);
    return this.tweetsService.update(id, user.id, updateTweetDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.tweetsService.remove(id, user.id);
  }
}
