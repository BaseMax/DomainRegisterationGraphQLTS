import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Domain } from '../../domain/entities/domain.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => [Domain])
  domains: Domain[];
}
