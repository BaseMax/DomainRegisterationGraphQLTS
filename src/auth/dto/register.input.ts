import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  email?: string;

  @Field(() => String)
  @IsString()
  password: string;
}
