import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterInput } from '../dto/register.input';
import { LoginInput } from '../dto/login.input';
import { PrismaService } from '../../prisma/prisma.service';
import { HashService } from './hash.service';
import { JwtPayload } from '../types/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from '../types/auth.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput): Promise<AuthPayload> {
    const user = await this.userAlreadyExists(registerInput.username);
    if (user) {
      throw new BadRequestException('Username It has already been used');
    }

    const hashedPassword = await this.hashService.hash(registerInput.password);

    const newUser = await this.prisma.user.create({
      data: {
        name: registerInput.name,
        email: registerInput?.email,
        username: registerInput.username,
        password: hashedPassword,
      },
    });

    const token = await this.getTokens({
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
    });

    return { access_token: token };
  }

  async login(loginInput: LoginInput): Promise<AuthPayload> {
    const user = await this.userAlreadyExists(loginInput.username);
    if (!user) {
      throw new BadRequestException('Username not found!');
    }

    const passwordMatch = await this.hashService.compare(
      loginInput.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new BadRequestException('information not valid');
    }

    const token = await this.getTokens({
      id: user.id,
      name: user.name,
      username: user.username,
    });

    return { access_token: token };
  }

  async getTokens(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async userAlreadyExists(username: string) {
    return await this.prisma.user.findUnique({
      where: { username },
    });
  }
}
