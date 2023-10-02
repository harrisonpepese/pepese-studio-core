import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { EUserRole } from "../enum/userRole.enum";

export class ChangeUserRoleDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(EUserRole)
    role: EUserRole;
}