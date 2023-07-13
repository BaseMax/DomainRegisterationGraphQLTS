import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './services/auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './types/auth.payload';
import { Public } from '../common/decorators';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthPayload)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Public()
  @Mutation(() => AuthPayload)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
