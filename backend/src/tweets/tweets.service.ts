import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tweet } from './entities/tweet.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet)
    private readonly tweetModel: typeof Tweet,
  ) {}

  async findAll(): Promise<Tweet[]> {
    return this.tweetModel.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findByUser(userId: string): Promise<Tweet[]> {
    return this.tweetModel.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Tweet> {
    const tweet = await this.tweetModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'avatar'],
        },
      ],
    });

    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }

    return tweet;
  }

  async create(userId: string, createTweetDto: CreateTweetDto): Promise<Tweet> {
    const tweet = await this.tweetModel.create({
      ...createTweetDto,
      userId,
    });

    return this.findOne(tweet.id);
  }

  async update(
    id: string,
    userId: string,
    updateTweetDto: CreateTweetDto,
  ): Promise<Tweet> {
    const tweet = await this.findOne(id);

    if (tweet.userId !== userId) {
      throw new NotFoundException('Tweet not found or unauthorized');
    }

    await tweet.update(updateTweetDto);

    return this.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const tweet = await this.findOne(id);

    if (tweet.userId !== userId) {
      throw new NotFoundException('Tweet not found or unauthorized');
    }

    await tweet.destroy();
  }
}
