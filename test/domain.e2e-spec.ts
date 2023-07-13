import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../src/auth/services/auth.service';
import * as bcrypt from 'bcrypt';

describe('Domain (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let prisma: PrismaClient;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);
    prisma = app.get(PrismaService);

    await app.init();
  });

  beforeAll(async () => {
    await prisma.user.deleteMany();
    await prisma.domain.deleteMany();

    const hashPassword = async (password: string) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    };

    const user = await prisma.user.create({
      data: {
        email: 'aa@gmail.com',
        name: 'testName',
        username: 'testName',
        password: await hashPassword('12345678'),
      },
    });

    token = await authService.getTokens({
      id: user.id,
      name: user.name,
      username: user.username,
    });

    await prisma.domain.createMany({
      data: [
        {
          name: 'domain.co',
          expirationDate: new Date().toISOString(),
          dnsRecords: ['ns1.aws.co', 'ns2.aws.co'],
          userId: user.id,
        },
        {
          name: 'domain.app',
          expirationDate: new Date().toISOString(),
          dnsRecords: ['ns1.icloud.co', 'ns2.icloud.co'],
          userId: user.id,
        },
      ],
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.domain.deleteMany();

    await app.close();
  });

  it('get all domains', async () => {
    const query = `query {
        domains {
          name
          dnsRecords
          expirationDate
          registrant {
            name
            email
          }
        }
      }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(data.domains).toBeDefined();
    expect(Array.isArray(data.domains)).toBe(true);
    expect(data.domains.length).toBeGreaterThan(1);
  });

  it('search domains', async () => {
    const keyword = 'domain.co';

    const query = `query {
        searchDomains(keyword: "${keyword}") {
           name
           dnsRecords
           expirationDate
           registrant {
            email
            name
           }
        }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(Array.isArray(data.searchDomains)).toBe(true);
    expect(data.searchDomains[0].name).toBe(keyword);
  });

  it('get all my domains', async () => {
    const query = `query {
        myDomains {
          id
          name
          registrant {
                  name
          }
        }
      }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(data.myDomains).toBeDefined();
    expect(Array.isArray(data.myDomains)).toBe(true);
    expect(data.myDomains.length).toBeGreaterThan(1);
  });

  it('check domain Availability', async () => {
    const domain = 'domain.co';
    const query = `query {
        checkAvailability(domain: "${domain}") {
          name
          dnsRecords
          expirationDate
          registrant {
            name
            email
          }
        }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(data.checkAvailability.name).toBe(domain);
  });

  it('register a new domain', async () => {
    const hashPassword = async (password: string) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    };

    const user = await prisma.user.create({
      data: {
        email: 'test@gmail.com',
        name: 'Name',
        username: 'testUsername',
        password: await hashPassword('12345678'),
      },
    });

    const token = await authService.getTokens({
      id: user.id,
      name: user.name,
      username: user.username,
    });

    const input = {
      name: 'test.co',
      expirationDate: 'Tuesday, 11 July 2025',
      dnsRecords: ['ns1.co.com', 'ns2.co.com'],
    };

    const mutation = `mutation {
        registerDomain(registerDomainInput: {
          name: "${input.name}",
          userId: ${user.id},
          expirationDate: "${input.expirationDate}",
          dnsRecords: "${input.dnsRecords}",
        }) {
          name
          dnsRecords
          registrant {
            name
            email
          }
        }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query: mutation });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(data.registerDomain.name).toBe(input.name);
  });

  it('update domain', async () => {
    const user = await prisma.user.create({
      data: {
        username: 'user',
        email: 'user@gmail.com',
        password: 'asasss',
        name: 'user',
      },
    });
    const domain = await prisma.domain.create({
      data: {
        name: 'app.co',
        dnsRecords: ['ns1.app.vi', 'ns2.app.vi'],
        expirationDate: new Date().toISOString(),
        userId: user.id,
      },
    });

    const newDomainName = 'app.us';

    const mutation = `mutation {
      updateDomain(id: ${domain.id}, updateDomainInput:{
        name:"${newDomainName}"
      }){
        name
      }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query: mutation });

    expect(response.status).toBe(200);
    expect(response.body.data.updateDomain.name).toBe(newDomainName);
  });

  it('delete domain', async () => {
    const user = await prisma.user.create({
      data: {
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'asasss',
        name: 'user',
      },
    });
    const domain = await prisma.domain.create({
      data: {
        name: 'app.co.i',
        dnsRecords: ['ns1.app.vi', 'ns2.app.vi'],
        expirationDate: new Date().toISOString(),
        userId: user.id,
      },
    });

    const mutation = `mutation{
      deleteDomain(id: ${domain.id}) {
        id
        }
      }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query: mutation });

    expect(response.status).toBe(200);
    expect(response.body.data?.deleteDomain.id).toBe(domain.id);
  });
});
