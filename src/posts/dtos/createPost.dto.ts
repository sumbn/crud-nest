import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @Length(4, 40)
  title: string;

  @MaxLength(250, {
    message: 'des is too long.',
  })
  description: string;
}
