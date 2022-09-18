import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {validationSchema} from "./config";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthGuard, KeycloakConnectModule, RoleGuard} from "nest-keycloak-connect";
import {MemberModule} from "./member";
import {Connection, connections} from "mongoose";
import * as toJson from '@meanie/mongoose-to-json'
import {APP_GUARD} from "@nestjs/core";
import { TeamModule } from './team/team.module';
import { DisciplineModule } from './discipline/discipline.module';
import { LeagueModule } from './league/league.module';
import { CoachModule } from './coach/coach.module';
import { LocationModule } from './location/location.module';
import { SchoolModule } from './school/school.module';

@Module({
    imports: [
        ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                validationSchema: validationSchema,
                validationOptions: {
                    abortEarly: true
                }
            }
        ),
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
                connectionFactory: (connection: Connection) => {
                    return connection.plugin(toJson);
                },
            }),
            inject: [ConfigService]
        }),
        KeycloakConnectModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                authServerUrl: configService.get<string>('KEYCLOAK_URI'),
                realm: configService.get<string>('KEYCLOAK_REALM'),
                clientId: configService.get<string>('KEYCLOAK_CLIENT_ID'),
                secret: "1FiLgbQDy9EDDAzWi0M9wfsdd31uzRwO",
            }),
            inject: [ConfigService]
        }),
        MemberModule,
        TeamModule,
        DisciplineModule,
        LeagueModule,
        CoachModule,
        LocationModule,
        SchoolModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard
        }
    ],
    controllers: []
})

export class AppModule {
}
