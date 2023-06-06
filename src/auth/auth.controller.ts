import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { IUserService } from 'src/users/users';
import { instanceToPlain } from 'class-transformer';
import { LocalAuthGuard } from './utils/Guards';

@Controller(Routes.Auth)
export class AuthController {

    constructor(
        @Inject(Services.Auth) private authService: IAuthService,
        @Inject(Services.Users) private userService: IUserService
    ) { }

    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto) {
        return instanceToPlain(await this.userService.createUser(createUserDto));
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login() {
        return 'Worked!';
    }

    @Get('status')
    status() { }

    @Post('logout')
    logout() { }
}
