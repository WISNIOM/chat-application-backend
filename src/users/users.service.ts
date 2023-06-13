import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from './users';
import { CreateUserDetails, FindUserOptions, FindUserParams } from 'src/utils/types';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/helpers';

@Injectable()
export class UsersService implements IUserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async createUser(userDetails: CreateUserDetails) {
        const { password, email } = userDetails;
        const existingUser = await this.userRepository.findOneBy({
            email
        });
        if (existingUser)
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        const hashedPassword = await hashPassword(password);
        const newUser = this.userRepository.create({ ...userDetails, password: hashedPassword });
        return this.userRepository.save(newUser);
    }

    async findUser(params: FindUserParams, options?: FindUserOptions): Promise<User> {
        const { id, email } = params;
        const selections: (keyof User)[] = [
            'email',
            'firstName',
            'lastName',
            'id',
        ];
        const selectionsWithPassword: (keyof User)[] = [...selections, 'password'];
        return this.userRepository.findOne({
            where: [{ id }, { email }],
            select: options?.selectAll ? selectionsWithPassword : selections,
        });
    }

}
