import {
  Column,
  Model,
  Table,
  HasMany,
  PrimaryKey,
  Default,
  Unique,
  AllowNull,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { Tweet } from 'src/tweets/entities/tweet.entity';

@Table({ timestamps: true })
export class User extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column
  declare id: string;

  @AllowNull(false)
  @Unique
  @Column
  username: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(true)
  @Column
  bio: string;

  @AllowNull(true)
  @Column
  avatar: string;

  @HasMany(() => Tweet)
  tweets: Tweet[];

  @Column({ defaultValue: true })
  isActive: boolean;
}
