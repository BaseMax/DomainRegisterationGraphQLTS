import { Test, TestingModule } from '@nestjs/testing';
import { DomainResolver } from './domain.resolver';
import { DomainService } from './domain.service';

describe('DomainResolver', () => {
  let resolver: DomainResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainResolver, DomainService],
    }).compile();

    resolver = module.get<DomainResolver>(DomainResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
