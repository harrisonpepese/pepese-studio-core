export class SingInResponseDto {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    userId: string;
    role: string;
}