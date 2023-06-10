import { User } from 'src/utils/typeorm';
import { ValidateUserDetails } from 'src/utils/types';

export interface IAuthService {
    validateUser(userDetails: ValidateUserDetails): Promise<User | null>;
}