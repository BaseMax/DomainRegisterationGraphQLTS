import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainResolver } from './domain.resolver';

@Module({
  providers: [DomainResolver, DomainService],
})
export class DomainModule {}
