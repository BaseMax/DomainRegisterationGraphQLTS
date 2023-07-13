import { INestApplication } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as request from 'supertest';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);

    await app.init();
  });

  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
  });

  it('register new user', async () => {
    const hashPassword = async (password: string) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    };

    const input = {
      name: 'newUser',
      username: 'usernameTest',
      password: '12345678',
    };

    const mutation = `mutation {
        register(registerInput: {
          name: "${input.name}",
          username: "${input.username}"
          password: "${await hashPassword(input.password)}"
        }) {
          access_token
        }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation });

    expect(response.status).toBe(200);
    expect(response.body.data.register.access_token).toBeDefined();
  });

  it('login user', async () => {
    const hashPassword = async (password: string) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    };

    await prisma.user.create({
      data: {
        email: 'aabc@gmail.com',
        name: 'testName',
        username: 'testUsername1',
        password: await hashPassword('12345678'),
      },
    });

    const input = {
      username: 'testUsername1',
      password: '12345678',
    };

    const mutation = `mutation {
        login(loginInput: {
          username: "${input.username}"
          password: "${input.password}"
        }) {
          access_token
        }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation });

    expect(response.status).toBe(200);
    expect(response.body.data?.login.access_token).toBeDefined();
  });
});
