import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RegisterDomainInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Date)
  expirationDate: Date;

  @Field(() => [String])
  dnsRecords: string[];
}
