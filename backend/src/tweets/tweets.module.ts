import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { AuthModule } from '../auth/auth.module';
import { Tweet } from './entities/tweet.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Tweet, User]), AuthModule],
  controllers: [TweetsController],
  providers: [TweetsService],
})
export class TweetsModule {}
