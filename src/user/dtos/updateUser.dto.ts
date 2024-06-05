import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: string;
}
