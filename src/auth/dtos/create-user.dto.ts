import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MaxLength(32)
    firstName: string;

    @IsNotEmpty()
    @MaxLength(32)
    lastName: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    password: string;
}