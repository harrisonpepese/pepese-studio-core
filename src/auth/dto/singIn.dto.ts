import { IsNotEmpty, IsString } from "class-validator";

export class SingInDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}