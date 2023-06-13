import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth';
import { ValidateUserDetails } from 'src/utils/types';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/users';
import { compareHash } from 'src/utils/helpers';

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        @Inject(Services.Users) private readonly usersService: IUserService,
    ) {

    }

    async validateUser(userDetails: ValidateUserDetails) {
        const { email, password } = userDetails;
        const user = await this.usersService.findUser({ email }, { selectAll: true });
        if (!user)
            throw new HttpException('Invalid credentials.', HttpStatus.UNAUTHORIZED);
        const isPasswordValid = compareHash(password, user.password);
        return isPasswordValid ? user : null;
    }

}
