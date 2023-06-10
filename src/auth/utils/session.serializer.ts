import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/utils/typeorm';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/users';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject(Services.Users)
        private readonly usersService: IUserService,
    ) {
        super();
    }

    serializeUser(user: User, done: Function) {
        done(null, user);
    }

    async deserializeUser(user: User, done: Function) {
        const authenticatedUser = await this.usersService.findUser({ id: user.id });
        return authenticatedUser ? done(null, authenticatedUser) : done(null, null);
    }
}