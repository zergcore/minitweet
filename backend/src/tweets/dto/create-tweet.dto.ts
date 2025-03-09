import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty({ message: 'Content cannot be empty' })
  @MaxLength(280, { message: 'Tweet cannot exceed 280 characters' })
  content: string;
}
