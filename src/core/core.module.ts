import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {IS_DEV_ENV} from "@/src/shared/utils/is-dev.util";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {getGraphQLConfig} from "@/src/core/config/graphql.config";
import { RedisModule } from './redis/redis.module';

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
    RedisModule
  ]
})
export class CoreModule {}
