import { Body, Controller, Get, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Routes, Services } from 'src/utils/types';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller(Routes.Auth)
export class AuthController {

    constructor(@Inject(Services.Auth) private authService: IAuthService) { }

    @Post('register')
    registerUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
    }

    @Post('login')
    login() {
        return 'Worked!';
    }

    @Get('status')
    status() { }

    @Post('logout')
    logout() { }
}
