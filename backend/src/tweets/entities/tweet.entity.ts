import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  DataType,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { UUIDV4 } from 'sequelize';

@Table
export class Tweet extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column
  declare id: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
