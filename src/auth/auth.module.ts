import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './auth.resolver';
import { HashService } from './services/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthResolver, AuthService, HashService, JwtStrategy],
})
export class AuthModule {}
