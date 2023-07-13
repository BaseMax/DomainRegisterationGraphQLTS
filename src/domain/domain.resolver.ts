import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DomainService } from './domain.service';
import { Domain } from './entities/domain.entity';
import { RegisterDomainInput } from './dto/register-domain.input';
import { UpdateDomainInput } from './dto/update-domain.input';
import { GetCurrentUserId, Public } from '../common/decorators';

@Resolver(() => Domain)
export class DomainResolver {
  constructor(private readonly domainService: DomainService) {}

  @Query(() => [Domain])
  myDomains(@GetCurrentUserId() userId: number) {
    return this.domainService.myDomains(userId);
  }

  @Public()
  @Query(() => [Domain])
  searchDomains(@Args('keyword', { type: () => String }) keyword: string) {
    return this.domainService.searchDomains(keyword);
  }

  @Public()
  @Query(() => Domain)
  checkAvailability(@Args('domain', { type: () => String }) domain: string) {
    return this.domainService.checkAvailability(domain);
  }

  @Mutation(() => Domain)
  updateDomainDNS(
    @Args('id', { type: () => Int }) id: number,
    @Args('dns', { type: () => [String] }) dns: string[],
  ) {
    return this.domainService.updateDns(id, dns);
  }

  @Mutation(() => Domain)
  registerDomain(
    @Args('registerDomainInput') registerDomainInput: RegisterDomainInput,
  ) {
    return this.domainService.create(registerDomainInput);
  }

  @Public()
  @Query(() => [Domain], { name: 'domains' })
  findAll() {
    return this.domainService.findAll();
  }

  @Public()
  @Query(() => Domain, { name: 'domain' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.domainService.findOne(id);
  }

  @Mutation(() => Domain)
  updateDomain(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateDomainInput') updateDomainInput: UpdateDomainInput,
  ) {
    return this.domainService.update(id, updateDomainInput);
  }

  @Mutation(() => Domain)
  deleteDomain(@Args('id', { type: () => Int }) id: number) {
    return this.domainService.remove(id);
  }

  @Mutation(() => Domain)
  transferDomain(
    @Args('id', { type: () => Int }) id: number,
    @Args('recipientUsername', { type: () => String })
    recipientUsername: string,
  ) {
    return this.domainService.transferDomain(id, recipientUsername);
  }
}
