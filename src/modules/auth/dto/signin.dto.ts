import { IsNotEmpty, IsString } from "class-validator"

export class SigningUserDTO {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}