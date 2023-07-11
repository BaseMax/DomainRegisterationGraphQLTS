import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [AuthModule, DomainModule],
})
export class AppModule {}
