import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {IS_DEV_ENV} from "@/src/shared/utils/is-dev.util";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {getGraphQLConfig} from "@/src/core/config/graphql.config";
import { RedisModule } from './redis/redis.module';
import {AccountModule} from "@/src/modules/auth/account/account.module";
import {SessionModule} from "@/src/modules/auth/session/session.module";

@Module({
  imports: [ConfigModule.forRoot({
    ignoreEnvFile: !IS_DEV_ENV,
    isGlobal: true,
  }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: getGraphQLConfig
    }),
    PrismaModule,
    RedisModule,
    AccountModule,
    SessionModule
  ]
})
export class CoreModule {}
