import { RegisterDomainInput } from './register-domain.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDomainInput extends PartialType(RegisterDomainInput) {}
