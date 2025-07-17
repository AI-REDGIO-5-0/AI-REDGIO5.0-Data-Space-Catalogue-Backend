import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudCatalogModule } from '../modules/cloud-catalog/cloud-catalog.module';
import { UsersModule } from '../modules/users/users.module';
import { AppConfig } from './app.config';
import { IAppConfig } from './app-config.interface';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  RoleGuard,
  TokenValidation,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forFeature(AppConfig),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(AppConfig)],
      useFactory: async (options: IAppConfig) => ({
        driver: PostgreSqlDriver,
        ...options.database,
        autoLoadEntities: true,
      }),
      inject: [AppConfig.KEY],
      driver: PostgreSqlDriver,
    }),
    CloudCatalogModule,
    UsersModule,
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule.forFeature(AppConfig)],
      inject: [AppConfig.KEY],
      useFactory: (options: IAppConfig) => ({
        authServerUrl: options.keycloak.url,
        realm: options.keycloak.realm,
        clientId: options.keycloak.clientId,
        secret: options.keycloak.clientSecret,
        useNestLogger: true,
        policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
        tokenValidation: TokenValidation.OFFLINE,
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
