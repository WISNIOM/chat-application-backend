import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IAuthService } from '../auth';
import { Services } from 'src/utils/constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(Services.Auth) private readonly authService: IAuthService
    ) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string) {
        return this.authService.validateUser({ email, password });
    }
}