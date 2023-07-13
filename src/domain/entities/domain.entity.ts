import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Domain {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  expirationDate: Date;

  @Field(() => [String])
  dnsRecords: string[];

  @Field(() => User)
  registrant: User;
}
