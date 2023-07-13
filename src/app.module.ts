import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DomainModule } from './domain/domain.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from './auth/guards/gql.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PrismaModule,
    AuthModule,
    DomainModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {}
