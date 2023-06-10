import { Body, Controller, Get, HttpStatus, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { IUserService } from 'src/users/users';
import { instanceToPlain } from 'class-transformer';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/guards';
import { Response, Request } from 'express';

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
    login(@Res() res: Response) {
        return res.sendStatus(HttpStatus.OK);
    }

    @Get('status')
    @UseGuards(AuthenticatedGuard)
    async status(@Req() req: Request) {
        return instanceToPlain(req.user);
    }

    @Post('logout')
    logout() { }
}
