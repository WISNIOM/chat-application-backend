import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Services } from 'src/utils/types';
import { AuthController } from './auth.controller';

@Module({
  providers: [
    {
      provide: Services.Auth,
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule { }
