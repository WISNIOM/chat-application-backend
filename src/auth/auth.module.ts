import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Services } from 'src/utils/constants';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [UsersModule],
  providers: [
    {
      provide: Services.Auth,
      useClass: AuthService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule { }
