import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;

}